/**
 * Facets sidebar — the listing's filter column (captured hydrated state of the source's
 * Live Search facets, authored verbatim). One row per group: [title | items].
 * Group kind is classified by content, never by row index:
 *  - a standalone link paragraph + list   → selected filters ("Clear All" + filter chips;
 *    a chip's <em>s are the source's hidden filter keys)
 *  - list items whose link starts with ★/☆ → ratings
 *  - list of links carrying an <em> count  → category tree (nested list = children;
 *    <strong> marks the selected category)
 *  - list of links without counts         → price ranges (+ the min/max range form)
 *  - list of plain items                   → checkbox facet ("Label <em>count</em>")
 * Authored nodes are MOVED into the source's facet markup (EW1); counts stay the authored <em>.
 * @ew-exempt Refine, +, Min, Max, Go — labels of the generated mobile refine toggle and the
 *   price-range form controls (UI strings in code, as on the source; no authored text).
 */

const STAR = /^[\s]*[★☆]/;

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/** moves every child node of `from` that precedes `stop` into `into` */
function moveBefore(from, stop, into) {
  let node = from.firstChild;
  while (node && node !== stop) {
    const next = node.nextSibling;
    into.append(node);
    node = next;
  }
  return into;
}

function countSpan(em) {
  const span = el('span', 'facet-count');
  if (em) span.append(em);
  return span;
}

function kindOf(cell) {
  const list = cell.querySelector('ul, ol');
  if (!list) return 'unknown';
  if ([...cell.children].some((c) => c.tagName === 'P' && c.querySelector('a'))) return 'selected';
  const links = [...list.querySelectorAll('li a')];
  if (!links.length) return 'checkbox';
  if (links.some((a) => STAR.test(a.textContent))) return 'ratings';
  if (links.some((a) => a.querySelector('em'))) return 'category';
  return 'price';
}

function decorateSelected(group, cell) {
  const box = el('div', 'selected-filters');
  const header = el('div', 'selected-filters-header');
  const title = el('span', 'selected-filters-title');
  title.append(...group.titleNodes);
  header.append(title);
  const listWrap = el('div', 'selected-filters-list');
  [...cell.children].forEach((child) => {
    if (child.tagName === 'P' && child.querySelector('a')) {
      const clear = el('span', 'selected-filters-clear');
      clear.append(child);
      header.append(clear);
    } else if (child.matches('ul, ol')) {
      listWrap.append(child);
    }
  });
  // chip: [<em>filter keys</em> …] "X" <strong>Facet:</strong> value — the keys are the
  // source's hidden filter-meta spans, the leading text the remove mark, the rest the label
  listWrap.querySelectorAll('li > a').forEach((a) => {
    if (a.classList.contains('selected-filter')) return;
    a.classList.add('selected-filter');
    const remove = el('span', 'selected-filter-remove');
    const label = el('span', 'selected-filter-label');
    const head = [];
    let node = a.firstChild;
    while (node && node.nodeName !== 'STRONG') {
      const next = node.nextSibling;
      if (node.nodeName === 'EM') {
        const meta = el('span', 'filter-meta');
        node.before(meta);
        meta.append(node);
        head.push(meta);
      } else if (node.nodeType === Node.TEXT_NODE && node.data.trim() && !remove.firstChild) {
        remove.append(node);
      } else {
        head.push(node);
      }
      node = next;
    }
    label.append(...[...a.childNodes].filter((n) => !head.includes(n)));
    a.append(remove, ' ', label);
  });
  box.append(header, listWrap);
  return box;
}

function decorateCategory(list) {
  list.querySelectorAll('li').forEach((li) => {
    li.classList.add('facet-item');
    // a list item holding a nested list arrives as <li><p><a>…</a></p><ul>…</ul></li>
    const a = li.querySelector(':scope > a, :scope > p > a');
    if (!a || a.classList.contains('category-link')) return;
    a.classList.add('category-link');
    if (a.querySelector('strong')) a.classList.add('selected');
    const em = a.querySelector('em');
    const name = moveBefore(a, em, el('span', 'category-name'));
    a.prepend(name, el('span', 'cross-circle'), ' ', countSpan(em));
  });
}

function decorateRatings(list) {
  list.querySelectorAll(':scope > li').forEach((li) => {
    li.classList.add('facet-item');
    const a = li.querySelector(':scope > a');
    if (!a || a.classList.contains('rating-link')) return;
    a.classList.add('rating-link');
    const em = a.querySelector('em');
    const stars = el('span', 'rating-stars');
    const first = a.firstChild;
    if (first && first.nodeType === Node.TEXT_NODE) {
      // split the authored glyph run into one text node per star (nodes moved, not rebuilt)
      let node = first;
      while (node && /^[★☆]/.test(node.data)) {
        const rest = node.data.length > 1 ? node.splitText(1) : null;
        const star = el('span', `star ${node.data === '★' ? 'filled' : 'empty'}`);
        star.append(node);
        stars.append(star, ' ');
        node = rest;
      }
    }
    const label = moveBefore(a, em, el('span', 'rating-label'));
    a.prepend(el('span', 'rating-indicator'), stars, label, ' ', countSpan(em));
  });
}

function decoratePrice(list, wrap) {
  list.querySelectorAll(':scope > li').forEach((li) => {
    li.classList.add('facet-item');
    const a = li.querySelector(':scope > a');
    if (!a || a.classList.contains('price-link')) return;
    a.classList.add('price-link');
    const label = el('span', 'price-label');
    label.append(...a.childNodes);
    a.append(el('span', 'price-indicator'), label);
  });
  const range = el('div', 'price-range');
  const row = el('div', 'price-range-group');
  const min = el('input', 'price-input', {
    type: 'number', placeholder: 'Min', min: '0', 'aria-label': 'Min',
  });
  const max = el('input', 'price-input', {
    type: 'number', placeholder: 'Max', min: '0', 'aria-label': 'Max',
  });
  const sep = el('span', 'price-separator');
  sep.textContent = '-';
  const go = el('button', 'price-go', { type: 'button' });
  go.textContent = 'Go';
  row.append(min, sep, max, go);
  range.append(row);
  wrap.after(range);
}

function decorateCheckbox(list) {
  list.querySelectorAll(':scope > li').forEach((li) => {
    li.classList.add('facet-item');
    if (li.querySelector(':scope > label')) return;
    const em = li.querySelector('em');
    const label = el('label');
    const input = el('input', '', { type: 'checkbox' });
    const text = moveBefore(li, em, el('span', 'facet-label'));
    label.append(input, text, ' ', countSpan(em));
    li.append(label);
  });
}

/**
 * @param {Element} block The facets-sidebar block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > .facets')) return; // EW9 re-entrant
  // decorateButtons titles every paragraph link with its text; the source's facet links carry none
  block.querySelectorAll('a[title]').forEach((a) => {
    if (a.title === a.textContent) a.removeAttribute('title');
  });
  const aside = el('aside', 'facets');
  const toggle = el('button', 'refine-toggle', {
    type: 'button',
    'aria-expanded': 'false',
    'aria-controls': 'facets-collapsible',
    'aria-label': 'Toggle Filters',
  });
  const icon = el('span', 'refine-icon');
  icon.textContent = '+';
  const text = el('span', 'refine-text');
  text.textContent = 'Refine';
  toggle.append(icon, ' ', text);
  toggle.addEventListener('click', () => {
    const open = !toggle.classList.contains('active');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  aside.append(toggle);
  const collapsible = el('div', 'facets-collapsible', { id: 'facets-collapsible' });

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const itemsCell = cells.find((c) => c.querySelector('ul, ol')) || cells[cells.length - 1];
    const titleCell = cells.find((c) => c !== itemsCell);
    const group = { titleNodes: titleCell ? [...titleCell.children] : [] };
    const kind = itemsCell ? kindOf(itemsCell) : 'unknown';
    if (kind === 'selected') {
      aside.append(decorateSelected(group, itemsCell));
      return;
    }
    const section = el('section', `facet-group facet-${kind}`);
    const title = el('div', 'facet-title');
    title.append(...group.titleNodes);
    section.append(title);
    if (itemsCell) {
      const wrap = el('div', 'facet-items');
      const list = itemsCell.querySelector('ul, ol');
      // leftovers pass: every authored element of the cell is kept, in order
      [...itemsCell.children].forEach((child) => wrap.append(child));
      section.append(wrap);
      if (kind === 'category') {
        wrap.classList.add('category-tree');
        decorateCategory(list);
      } else if (kind === 'ratings') {
        wrap.classList.add('ratings-list');
        decorateRatings(list);
      } else if (kind === 'price') {
        wrap.classList.add('price-ranges');
        decoratePrice(list, wrap);
      } else if (kind === 'checkbox') {
        decorateCheckbox(list);
      }
    }
    collapsible.append(section);
  });

  aside.append(collapsible);
  block.replaceChildren(aside);
}
