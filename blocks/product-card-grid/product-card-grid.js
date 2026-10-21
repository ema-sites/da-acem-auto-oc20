/**
 * Product card grid — the listing's result cards plus the results pager.
 * Each row holding a heading is one card; its parts are classified by content:
 *  - image before the title → product icon; image after it → partner badge
 *  - h3 (its link is the card link, EW6: href read, inner anchor unwrapped) → title
 *  - the heading after the title (h4) → vendor
 *  - a paragraph like "60%" → rating; a paragraph with "$" → price
 *  - a paragraph "Assured" → Adobe assurance badge flag (kept hidden beside the link; the
 *    badge is painted by CSS)
 * A row without a heading is the pager: a paragraph + plain list → "Results per page"
 * limiter (the authored list stays hidden; the select shows option clones, EW4), a list of
 * links → page links (<strong> = current page, a link titled "Next" = next page).
 * A row without a heading that holds a standalone link paragraph is the 0-result empty state
 * (source's .products-empty): message, label, popular-query links, divider, see-all link.
 * All authored nodes are MOVED into the source's card markup (EW1).
 */

const PCT = /^\s*\d+(\.\d+)?\s*%\s*$/;
const ASSURED = /^\s*assured\s*$/i;

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function selectFromList(list, className, id) {
  const select = el('select', className, { id });
  [...list.querySelectorAll(':scope > li')].forEach((li) => {
    const option = document.createElement('option');
    option.textContent = li.textContent;
    select.append(option);
  });
  return select;
}

/** the row's authored elements, in order, across cells */
function contentOf(row) {
  return [...row.querySelectorAll(':scope > div > *')];
}

function isImage(node) {
  return node.matches('picture, img') || !!(node.tagName === 'P'
    && node.querySelector('picture, img') && !node.textContent.trim());
}

function buildCard(row) {
  const nodes = contentOf(row);
  const li = el('li', 'product-card');
  const link = el('a', 'product-card-link');
  const body = el('div', 'product-card-body');
  const head = el('div', 'product-card-head');
  const thumb = el('div', 'product-card-thumb');
  head.append(thumb);
  const rating = el('div', 'product-card-rating');
  const foot = el('div', 'product-card-foot');
  const partner = el('span', 'product-card-partner');
  const price = el('span', 'product-card-price');
  foot.append(partner, ' ', price);
  let title = null;
  let vendor = null;
  let assured = null;
  const extra = [];

  nodes.forEach((node) => {
    if (isImage(node)) {
      (title ? partner : thumb).append(node);
    } else if (/^H[1-6]$/.test(node.tagName) && !title) {
      title = node;
      const a = node.querySelector('a');
      if (a) {
        link.href = a.href;
        if (a.title) link.title = a.title;
        a.replaceWith(...a.childNodes); // EW6: card-as-link unwraps the inner anchor
      }
    } else if (/^H[1-6]$/.test(node.tagName) && !vendor) {
      vendor = node;
    } else if (node.tagName === 'P' && PCT.test(node.textContent)) {
      const value = node.textContent.trim();
      const stars = el('span', 'stars', { title: value });
      const fill = el('span', '', { style: `width:${value}` });
      const hidden = el('span');
      hidden.append(node);
      fill.append(hidden);
      stars.append(fill);
      rating.append(stars);
    } else if (node.tagName === 'P' && ASSURED.test(node.textContent)) {
      assured = el('span', 'product-card-flag', { hidden: '' });
      assured.append(node);
    } else if (node.tagName === 'P' && node.textContent.includes('$')) {
      price.append(node);
    } else {
      extra.push(node);
    }
  });

  // the badge paints the flag; the authored flag text stays outside the card link so the
  // link's text is the source's (title, vendor, rating, price — whitespace-separated)
  if (assured) head.append(' ', el('span', 'product-card-assured'));
  const parts = [head, title, vendor, el('hr'), rating, foot, ...extra].filter(Boolean);
  parts.forEach((part) => body.append(part, ' '));
  link.append(body);
  li.append(link);
  if (assured) li.append(assured);
  return li;
}

function buildControls(row) {
  const controls = el('div', 'listing-controls');
  const limiter = el('div', 'limiter');
  const label = el('span', 'limiter-label');
  const options = el('div', 'limiter-options', { hidden: '' });
  const pages = el('div', 'pages');
  const leftovers = [];
  contentOf(row).forEach((node) => {
    if (node.matches('ul, ol') && node.querySelector('a, strong')) {
      pages.append(node);
    } else if (node.matches('ul, ol')) {
      options.append(node);
    } else if (node.tagName === 'P' && !label.children.length) {
      label.append(node);
    } else {
      leftovers.push(node);
    }
  });
  limiter.append(label);
  const optList = options.querySelector('ul, ol');
  if (optList) limiter.append(selectFromList(optList, 'select', 'limiter'));
  limiter.append(options);

  const list = pages.querySelector('ul, ol');
  if (list) {
    list.querySelectorAll(':scope > li').forEach((item) => {
      item.classList.add('item');
      const a = item.querySelector('a');
      const strong = item.querySelector(':scope > strong');
      if (strong) {
        item.classList.add('current');
      } else if (a && (/next/i.test(a.title) || !/^\s*\d+\s*$/.test(a.textContent))) {
        item.classList.add('pages-item-next');
        a.classList.add('action', 'next');
      } else if (a) {
        a.classList.add('page');
      }
    });
  }
  controls.append(limiter, pages, ...leftovers);
  return controls;
}

function isLinkParagraph(node) {
  return node.tagName === 'P' && node.children.length === 1
    && node.firstElementChild.tagName === 'A' && node.textContent.trim()
      === node.firstElementChild.textContent.trim();
}

function buildEmpty(row) {
  const empty = el('div', 'products-empty');
  const suggestions = el('div', 'empty-suggestions');
  contentOf(row).forEach((node, i) => {
    if (i === 0) {
      node.classList.add('empty-query');
      empty.append(node);
      return;
    }
    if (node.matches('ul, ol')) {
      node.classList.add('popular-queries');
    } else if (isLinkParagraph(node)) {
      // decorateButtons styled it as a button; the source's see-all link is its own style
      node.classList.remove('button-container');
      node.classList.add('see-all');
      const a = node.querySelector('a');
      a.classList.remove('button');
      a.classList.add('see-all-link');
      a.removeAttribute('title');
    } else if (node.tagName === 'P' && !suggestions.children.length) {
      node.classList.add('suggestions-label');
    } else if (node.tagName === 'P') {
      node.classList.add('or-divider');
    }
    suggestions.append(node);
  });
  empty.append(suggestions);
  return empty;
}

/**
 * @param {Element} block The product-card-grid block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > .products-grid')) return; // EW9 re-entrant
  const hasCards = !!block.querySelector('h1, h2, h3, h4, h5, h6');
  const grid = el(hasCards ? 'ul' : 'div', 'products-grid');
  const after = [];
  [...block.children].forEach((row) => {
    if (row.querySelector('h1, h2, h3, h4, h5, h6')) {
      grid.append(buildCard(row));
    } else if (contentOf(row).some(isLinkParagraph)) {
      grid.classList.add('products-grid-empty');
      grid.append(buildEmpty(row));
    } else if (row.querySelector('ul, ol')) {
      after.push(buildControls(row));
    } else {
      after.push(...contentOf(row));
    }
  });
  block.replaceChildren(grid, ...after);
}
