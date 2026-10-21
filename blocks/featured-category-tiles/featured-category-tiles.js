/**
 * featured-category-tiles — home "Featured Categories" row
 * (source: section.case-featured-category).
 *
 * Authoring: the section heading is default content before the block (reabsorbed, EW8);
 * one row per tile holding the category link (label = link text). A heading authored in
 * the block's first row is accepted too. The icon glyph is decorative (IconFeatured font,
 * CSS only), chosen from the link target's category; unknown categories render no glyph.
 */

const ICONS = [
  ['customer-support', 'gar'],
  ['payments', 'lock'],
  ['security', 'lock'],
  ['marketing', 'met'],
  ['accounting', 'cal'],
  ['finance', 'cal'],
  ['shipping', 'truck'],
  ['fulfillment', 'truck'],
  ['site-optimization', 'clock'],
  ['optimization', 'clock'],
];

function el(tag, className) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  return n;
}

function iconFor(href) {
  const path = (href || '').toLowerCase();
  const hit = ICONS.find(([key]) => path.includes(key));
  return hit ? hit[1] : '';
}

export default function decorate(block) {
  if (block.querySelector(':scope > .featured-categories')) return; // EW9 re-entrant

  const outer = el('div', 'featured-categories');
  const inner = el('div', 'page-main');
  const head = el('div', 'tiles-head');
  const tiles = el('div', 'category-tiles');

  // EW8: reabsorb the section head (default content before the block)
  const prev = block.parentElement && block.parentElement.previousElementSibling;
  if (prev && prev.classList.contains('default-content-wrapper')) {
    head.append(...prev.childNodes);
    prev.remove();
  }

  [...block.children].forEach((row) => {
    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
    const links = [...row.querySelectorAll('a[href]')];
    if (heading && !links.length) {
      head.append(...[...row.children].flatMap((c) => [...c.childNodes]));
      return;
    }
    links.forEach((a) => {
      const col = el('div', 'col');
      const icon = el('span', 'icon');
      const name = iconFor(a.getAttribute('href'));
      if (name) icon.classList.add(`icon-${name}`);
      icon.setAttribute('aria-hidden', 'true');
      a.prepend(icon);
      col.append(a.closest('p') || a);
      tiles.append(col);
    });
  });

  if (head.childNodes.length) inner.append(head);
  inner.append(tiles);
  outer.append(inner);
  block.replaceChildren(outer);
}
