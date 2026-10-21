/**
 * Product detail sections — the product page's stacked detail boxes (Overview, Technical
 * Specifications, Quality Report, Release Notes, Support, Q & A, Reviews; styles-m
 * .product.info.detailed).
 *
 * Content model: one row per section — | section heading (h3) | body … |
 *   one body cell        → prose (a body with h2 headings is the Overview description)
 *   three or more cells  → spec columns; a cell after the third is the spec note
 *   empty body           → the section is carried but hidden (the source's empty
 *                          Trader Information), and its contents-nav item is hidden
 *   a body that is only an h2 (+ one paragraph) → the Bazaarvoice Q&A / Reviews snapshot
 * Each section head gets the id toId(heading) — the contents nav links to it.
 * A documentation link that points back at this product page (the source's empty
 * Reference Manuals URL) is hidden, as on the source.
 *
 * Decode tier: reconstructive (repeat group, one unit per row; every cell consumed).
 * Authored h3 / h2 / p / ul are MOVED. "Back to top" links and the Bazaarvoice widget
 * chrome (stars, hidden rating filter) are synthesized (source widget markup).
 * @ew-exempt integration: Bazaarvoice snapshot chrome (stars, rating filter, ask button
 *   host) is third-party widget state, synthesized; authored Q&A/Reviews texts are moved.
 * @param {Element} block The product-detail-sections block element
 */

const SOURCE = 'https://commercemarketplace.adobe.com';

/** same slug rule as aem.js toClassName (inlined: the block stays import-free) */
function toId(name) {
  return typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : '';
}

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function text(tag, className, value, attrs) {
  const node = el(tag, className, attrs);
  node.textContent = value;
  return node;
}

function sourcePage() {
  return `${SOURCE}${window.location.pathname.replace(/\.html$/, '')}.html`;
}

function isBazaarvoice(cell) {
  const kids = [...cell.children];
  if (!kids.length || kids[0].tagName !== 'H2') return false;
  if (cell.querySelectorAll('h1, h2, h3, h4, h5, h6, ul, ol, a, picture').length !== 1) return false;
  return kids.length <= 2;
}

function bvActionBar(h2) {
  const header = el('div', 'bv-header');
  const bar = el('div', 'bv-action-bar');
  bar.append(h2);
  header.append(bar);
  return header;
}

function bvQuestions(cell) {
  const [h2, label] = [...cell.children];
  const snap = el('div', 'bv-snapshot bv-snapshot-qa');
  const form = el('form', 'bv-placeholder', { action: `${sourcePage()}#bv_questions`, method: 'get' });
  const ask = el('div', 'bv-ask', { role: 'button', tabindex: '0' });
  ask.append(label);
  const submit = () => form.requestSubmit();
  ask.addEventListener('click', submit);
  ask.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      submit();
    }
  });
  form.append(ask);
  snap.append(bvActionBar(h2), form);
  return snap;
}

function bvFilter() {
  const filter = el('div', 'bv-filter');
  filter.hidden = true;
  const filters = el('div', 'bv-filters');
  const toggle = el('button', 'bv-filter-toggle', {
    id: 'bv-content-filter-Rating-dropdown', type: 'button', 'aria-label': 'Menu Filter by Rating',
  });
  toggle.append(
    text('span', '', '▼', { 'aria-hidden': 'true' }),
    document.createTextNode(' '),
    text('span', '', 'Rating'),
    document.createTextNode(' '),
    text('span', 'visually-hidden', 'Filter by Rating'),
  );
  const select = el('select', '', { id: 'bv-dropdown-select-11' });
  const stars = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
  stars.forEach((s) => select.append(new Option(s)));
  filters.append(
    toggle,
    text('label', 'visually-hidden', 'Filter by Rating', { for: 'bv-dropdown-select-11' }),
    select,
  );
  const active = el('div', 'bv-active-filters');
  const list = el('ul');
  stars.forEach((s) => {
    const li = el('li');
    const b = el('button', '', { type: 'button' });
    b.append(
      text('span', 'visually-hidden', `Active Filters ${s}`),
      document.createTextNode(' '),
      text('span', 'visually-hidden', 'Remove Filter '),
      document.createTextNode(` ${s} `),
      text('span', '', '✘'),
    );
    li.append(b);
    list.append(li);
  });
  const clear = el('li');
  const cb = el('button', '', { type: 'button' });
  cb.append(
    text('span', '', 'Clear All'),
    document.createTextNode(' '),
    text('span', '', '✘'),
    document.createTextNode(' '),
    text('span', 'visually-hidden', 'Clear All Filters'),
  );
  clear.append(cb);
  list.append(clear);
  active.append(text('h4', '', 'Active Filters'), list);
  filter.append(filters, active);
  return filter;
}

function bvReviews(cell) {
  const h2 = cell.querySelector('h2');
  const snap = el('div', 'bv-snapshot bv-snapshot-reviews');
  const placeholder = el('div', 'bv-placeholder');
  placeholder.append(
    text('span', 'bv-stars', '★★★★★', { 'aria-hidden': 'true' }),
    text('span', 'visually-hidden', 'No rating value'),
  );
  snap.append(bvActionBar(h2), placeholder, bvFilter());
  return snap;
}

/** the source hides the Reference Manuals link when it only points back at the product page */
function hideSelfLinks(scope) {
  const here = window.location.pathname.replace(/\.html$/, '');
  scope.querySelectorAll('a[href]').forEach((a) => {
    try {
      const url = new URL(a.getAttribute('href'), window.location.href);
      if (url.pathname.replace(/\.html$/, '') === here && url.search) a.hidden = true;
    } catch { /* keep the link */ }
  });
}

function buildBox(bodyCells) {
  const box = el('div', 'box');
  const filled = bodyCells.filter((c) => c.children.length || c.textContent.trim());
  if (filled.length >= 3) {
    const specs = el('div', 'specs');
    filled.slice(0, 3).forEach((cell) => {
      const col = el('div', 'specs-col');
      col.append(...cell.childNodes);
      specs.append(col);
    });
    box.append(specs);
    filled.slice(3).forEach((cell) => {
      const note = el('div', 'specs-note');
      note.append(...cell.childNodes);
      box.append(note);
    });
    hideSelfLinks(specs);
    return box;
  }
  const [cell] = filled;
  if (!cell) return box;
  if (isBazaarvoice(cell)) {
    const hasLabel = [...cell.children].some((c) => c.tagName !== 'H2' && c.textContent.trim());
    box.append(hasLabel ? bvQuestions(cell) : bvReviews(cell));
    return box;
  }
  if (cell.querySelector(':scope > h2')) {
    const description = el('div', 'description');
    description.append(...cell.childNodes);
    box.append(description);
    return box;
  }
  box.append(...cell.childNodes);
  return box;
}

function hideNavItem(id) {
  document.querySelectorAll('.product-contents-nav a[href^="#"]').forEach((a) => {
    if (a.getAttribute('href').slice(1) === id) a.closest('li').classList.add('sidenav-item--hidden');
  });
}

export default function decorate(block) {
  if (block.querySelector(':scope > .detail-items')) return; // EW9 re-entrant
  const items = el('div', 'detail-items');
  const empties = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const headCell = cells.find((c) => c.querySelector('h1, h2, h3, h4, h5, h6')) || cells[0];
    if (!headCell) return;
    const heading = headCell.querySelector('h1, h2, h3, h4, h5, h6') || headCell.firstElementChild;
    const bodyCells = cells.filter((c) => c !== headCell);
    const id = toId(heading ? heading.textContent : '');

    const section = el('section', 'detail-item');
    const head = el('div', 'box-head', { id });
    if (heading) {
      heading.removeAttribute('id');
      head.append(heading);
    }
    head.append(text('a', 'box-back-top', 'Back to top', { href: '#top' }));
    // leftovers in the heading cell stay with the head (nothing is dropped)
    [...headCell.children].forEach((c) => head.append(c));

    const box = buildBox(bodyCells);
    if (!box.children.length && !box.textContent.trim()) {
      section.classList.add('detail-item-empty');
      empties.push(id);
    }
    section.append(head, box);
    items.append(section);
  });
  block.replaceChildren(items);
  empties.forEach(hideNavItem);
}
