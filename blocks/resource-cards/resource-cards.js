/**
 * resource-cards — home "Adobe Commerce Resources" cards (source: section.case-resources).
 *
 * Authoring: the section heading is default content before the block (reabsorbed, EW8);
 * one row per card: heading, body paragraph(s), call-to-action link paragraph. The card
 * art is decorative (CSS only), chosen from the card's topic: assurance = illustration,
 * partner = arm glyph, training = training glyph, certification = certificate glyph.
 */

const ART = [
  [/assurance/, 'resource-illustration'],
  [/partner/, 'icon icon-arm'],
  [/training|developers/, 'icon icon-training'],
  [/certif/, 'icon icon-certif'],
];

function el(tag, className) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  return n;
}

// read-only classification helper — never used to produce displayed text (EW1)
const text = (n) => (n ? n.textContent.trim() : '');

function artFor(heading, link) {
  const key = `${text(heading)} ${link ? link.getAttribute('href') : ''}`.toLowerCase();
  const hit = ART.find(([re]) => re.test(key));
  return hit ? hit[1] : '';
}

function buildCard(row) {
  const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
  const link = row.querySelector('a[href]');
  const ctaPar = link ? (link.closest('p') || link) : null;
  const card = el('div', 'resource-card');

  const header = el('div', 'resource-header');
  if (heading) header.append(heading);
  card.append(header);

  const art = artFor(heading, link);
  if (art) {
    const span = el('span', art);
    span.setAttribute('aria-hidden', 'true');
    card.append(span);
  }

  const body = el('div', 'resource-body');
  // leftovers pass: every authored node other than heading and CTA goes to the body, in order
  [...row.children].forEach((cell) => {
    [...cell.childNodes].forEach((n) => {
      if (n === ctaPar || (n.nodeType === Node.TEXT_NODE && !n.textContent.trim())) return;
      body.append(n);
    });
  });
  if (ctaPar) {
    const actions = el('div', 'resource-actions');
    actions.append(el('hr'), ctaPar);
    body.append(actions);
  }
  card.append(body);
  return card;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .resources')) return; // EW9 re-entrant

  const outer = el('div', 'resources');
  const main = el('div', 'page-main');
  const inner = el('div', 'resources-inner');
  const head = el('div', 'resources-head');
  const list = el('div', 'cards-row');

  // EW8: reabsorb the section head (default content before the block)
  const prev = block.parentElement && block.parentElement.previousElementSibling;
  if (prev && prev.classList.contains('default-content-wrapper')) {
    head.append(...prev.childNodes);
    prev.remove();
  }

  [...block.children].forEach((row) => {
    const hasCard = row.querySelector('a[href]') || row.querySelectorAll('p').length;
    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
    if (!hasCard && heading) {
      head.append(...[...row.children].flatMap((c) => [...c.childNodes]));
      return;
    }
    list.append(buildCard(row));
  });

  if (head.childNodes.length) inner.append(head);
  inner.append(list);
  main.append(inner);
  outer.append(main);
  block.replaceChildren(outer);
}
