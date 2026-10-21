/**
 * Product contents nav — the sticky "CONTENTS" side-nav of the product page (spectrum SideNav).
 *
 * Content model: one cell — a bold heading paragraph ("CONTENTS") and a list of in-page
 * links (#<section-id>, the ids product-detail-sections gives its section heads).
 *
 * Decode tier: template-slotted. The authored paragraph and list are MOVED into
 * nav.contents-nav > ul.sidenav > li.sidenav-item (head + nested list); list items get
 * the sidenav-item state class. Behaviour (program.js): scroll-spy moves `is-selected` to
 * the item whose section head has passed 120px from the viewport top; an item whose
 * section is empty (product-detail-sections marks it .detail-item-empty) is hidden.
 * @param {Element} block The product-contents-nav block element
 */

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function targetOf(a) {
  const href = a.getAttribute('href') || '';
  if (!href.startsWith('#') || href.length < 2) return null;
  return document.getElementById(decodeURIComponent(href.slice(1)));
}

/** hide items whose target section is empty (the source hides the empty Trader Information) */
function syncHiddenItems(root = document) {
  root.querySelectorAll('.product-contents-nav .sidenav-item a[href^="#"]').forEach((a) => {
    const target = targetOf(a);
    const empty = !!(target && target.closest('.detail-item-empty'));
    a.closest('li').classList.toggle('sidenav-item--hidden', empty);
  });
}

function scrollSpy(nav) {
  let items = null;
  let current = null;
  const collect = () => [...nav.querySelectorAll('.sidenav-item a[href^="#"]')]
    .map((a) => ({ li: a.closest('li'), target: targetOf(a) }))
    .filter((i) => i.target);
  const update = () => {
    if (!items || !items.length) {
      items = collect();
      if (!items.length) return;
      current = items.find((i) => i.li.classList.contains('is-selected')) || null;
    }
    let next = items[0];
    items.forEach((i) => {
      if (i.target.getBoundingClientRect().top <= 120) next = i;
    });
    if (next === current) return;
    if (current) current.li.classList.remove('is-selected');
    next.li.classList.add('is-selected');
    current = next;
  };
  window.addEventListener('scroll', update, { passive: true });
}

export default function decorate(block) {
  if (block.querySelector(':scope > nav')) return; // EW9 re-entrant
  const cell = block.querySelector(':scope > div > div') || block;
  const list = cell.querySelector('ul, ol');
  const head = [...cell.children].find((c) => c !== list && c.textContent.trim());

  const nav = el('nav', 'contents-nav', { 'aria-label': 'Contents' });
  const outer = el('ul', 'sidenav');
  const group = el('li', 'sidenav-item');
  const headWrap = el('div', 'sidenav-head');
  if (head) headWrap.append(head);
  group.append(headWrap);
  if (list) {
    [...list.children].forEach((li, i) => {
      li.classList.add('sidenav-item');
      if (i === 0) li.classList.add('is-selected'); // the source's initial selection
    });
    group.append(list);
  }
  outer.append(group);
  nav.append(outer);
  block.replaceChildren(nav);

  syncHiddenItems(block.ownerDocument);
  scrollSpy(nav);
}
