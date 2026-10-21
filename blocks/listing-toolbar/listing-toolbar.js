/**
 * Listing toolbar — the results header of a listing (result count + sort control).
 * Content (classified by content, not position):
 *  - a paragraph holding <strong> → the result count ("<strong>3948</strong> Results")
 *  - another paragraph → the sort label; the list after it → the sort options
 * The authored option list stays in the DOM (hidden, editable); the native <select> shows
 * presentational option clones of it (EW4).
 */

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/**
 * Builds a native select whose options mirror an authored list (presentational clones).
 * @param {Element} list authored ul/ol
 * @param {string} className select classes
 * @param {string} id select id
 */
function selectFromList(list, className, id) {
  const select = el('select', className, { id });
  [...list.querySelectorAll(':scope > li')].forEach((li) => {
    const option = document.createElement('option');
    option.textContent = li.textContent;
    select.append(option);
  });
  return select;
}

/**
 * @param {Element} block The listing-toolbar block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > .products-header')) return; // EW9 re-entrant
  const header = el('div', 'products-header');
  const count = el('div', 'products-count');
  const number = el('span', 'toolbar-number');
  count.append(number);
  const sort = el('div', 'products-sort');
  const label = el('label', 'sort-label', { for: 'sorter' });
  const options = el('div', 'sort-options', { hidden: '' });
  const leftovers = [];

  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  nodes.forEach((node) => {
    if (node.matches('ul, ol')) {
      options.append(node);
    } else if (node.tagName === 'P' && node.querySelector('strong') && !number.children.length) {
      number.append(node);
    } else if (node.tagName === 'P' && !label.children.length) {
      label.append(node);
    } else {
      leftovers.push(node);
    }
  });

  sort.append(label);
  const list = options.querySelector('ul, ol');
  if (list) sort.append(selectFromList(list, 'select sorter', 'sorter'));
  sort.append(options);
  header.append(count, sort);
  block.replaceChildren(header, ...leftovers);
}
