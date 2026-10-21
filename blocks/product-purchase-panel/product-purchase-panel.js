/**
 * Product purchase panel — edition / store-version selects, the price table, Add to cart
 * and Contact Vendor (styles-m .product-info-main).
 *
 * Content model (rows classified by shape, never by index):
 *   | label | list of options |   → a select field (label + native <select>)
 *   | label | value |            → a price row (the last price row is TOTAL DUE TODAY)
 *   | plain text |               → the Add to cart action (a native-feeling submit control)
 *   | link |                     → a CTA (Contact Vendor; buttonized by the runtime)
 *
 * Decode tier: template-slotted (fixed composition). Authored labels, prices and the
 * Add-to-cart paragraph are MOVED into the prototype's slots; the action control is a
 * div[role=button] hosting the authored paragraph (EW7: no <button> hosts authored text).
 * Add to cart submits to the source store page (commerce stays on the source).
 * @ew-exempt config: select option lists — a native <select> cannot host editable prose, so
 *   each authored list item becomes an <option> (text carried over; the list itself is consumed).
 * @ew-exempt integration: the source's hidden cart-state placeholders (installation service,
 *   installation price row, frequency select) are carried hidden for layout and parity.
 *
 * Variant `installation` (vendors selling an installation service): the FIRST label+value
 * row is the visible installation-service checkbox (label + price moved in), and the price
 * row before the total is the authored Installation row (nothing synthesized hidden).
 * @param {Element} block The product-purchase-panel block element
 */

const SOURCE = 'https://commercemarketplace.adobe.com';

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function cellsOf(row) {
  return [...row.children];
}

function selectField(row, index) {
  const [labelCell, listCell] = cellsOf(row);
  const id = `purchase-select-${index}`;
  const label = el('label', 'label', { for: id });
  label.append(...labelCell.childNodes);
  const select = el('select', 'panel-select', { id });
  listCell.querySelectorAll('li').forEach((li) => {
    const option = document.createElement('option');
    option.text = li.textContent;
    select.append(option);
  });
  return [label, select];
}

function boxIn(...children) {
  const box = el('div', 'box-in');
  const inner = el('div', 'box-tocart');
  inner.append(...children);
  box.append(inner);
  return box;
}

function priceRow(row) {
  const [left, right] = cellsOf(row);
  const line = el('div', 'price-row');
  const colLeft = el('div', 'col-left');
  const colRight = el('div', 'col-right');
  colLeft.append(...left.childNodes);
  if (right) colRight.append(...right.childNodes);
  line.append(colLeft, colRight);
  return line;
}

/** the source's hidden cart-state placeholders (no visible text; layout + parity) */
function installationBox() {
  const service = el('div', '', { id: 'installation_service' });
  service.hidden = true;
  const check = el('div', 'case-checkbox');
  check.append(el('input', '', { type: 'checkbox', 'aria-label': 'Installation service' }));
  const price = el('span', '', { id: 'installation_service_price' });
  price.textContent = '0';
  service.append(check, document.createTextNode(' Installation service '), price);
  return boxIn(service);
}

/** variant `installation`: the authored service row as the source's visible checkbox */
function installationService(row) {
  const [labelCell, priceCell] = cellsOf(row);
  const service = el('div', 'installation-service', { id: 'installation_service' });
  const check = el('div', 'case-checkbox');
  const input = el('input', 'box-opacity', { type: 'checkbox', id: 'installation-service-check' });
  const box = el('label', 'bg-arrow', { for: 'installation-service-check' });
  check.append(input, box);
  const label = el('label', 'service-label', { for: 'installation-service-check' });
  label.append(...labelCell.childNodes);
  const price = el('span', '', { id: 'installation_service_price' });
  if (priceCell) price.append(...priceCell.childNodes);
  service.append(check, label, document.createTextNode(' '), price);
  return boxIn(service);
}

function installationPriceRow() {
  const line = el('div', 'price-row');
  line.hidden = true;
  const left = el('div', 'col-left');
  const strong = el('strong');
  strong.textContent = 'Installation:';
  left.append(strong);
  const right = el('div', 'col-right');
  const b = el('b');
  const span = el('span', 'installation_price');
  span.textContent = '$0.00';
  b.append(span);
  right.append(b);
  line.append(left, right);
  return line;
}

function addToCart(row) {
  const box = el('div', 'box-in');
  const form = el('form', 'product-add-form', {
    action: `${SOURCE}${window.location.pathname.replace(/\.html$/, '')}.html`,
    method: 'get',
  });
  const freq = el('div', 'ps-product');
  freq.hidden = true;
  const freqSelect = el('select', 'panel-select', { id: 'ps-frequency-option', 'aria-label': 'Frequency' });
  freqSelect.append(new Option('Yearly'));
  freq.append(freqSelect);
  const wrap = el('div', 'box-tocart box-tocart-action');
  const action = el('div', 'btn-accent', {
    id: 'product-addtocart-button', role: 'button', tabindex: '0',
  });
  const cell = row.firstElementChild || row;
  action.append(...cell.childNodes);
  const submit = () => form.requestSubmit();
  action.addEventListener('click', submit);
  action.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      submit();
    }
  });
  wrap.append(action);
  form.append(freq, wrap);
  box.append(form);
  return box;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .box-in')) return; // EW9 re-entrant
  const rows = [...block.children];
  const selects = [];
  const prices = [];
  let action = null;
  const ctas = [];

  rows.forEach((row) => {
    const cells = cellsOf(row);
    if (cells.length >= 2 && cells[1].querySelector('ul, ol')) selects.push(row);
    else if (cells.length >= 2) prices.push(row);
    else if (row.querySelector('a[href]')) ctas.push(row);
    else if (row.textContent.trim()) action = row;
  });

  const out = [];
  selects.forEach((row, i) => {
    const [label, select] = selectField(row, i);
    if (i === 1) {
      const compat = el('div', '', { id: 'extension_compatibility' });
      compat.append(label, document.createTextNode(' '), select);
      out.push(boxIn(compat));
    } else {
      out.push(boxIn(label, document.createTextNode(' '), select));
    }
  });
  const service = block.classList.contains('installation') && prices.length > 2;
  out.push(service ? installationService(prices.shift()) : installationBox());

  const priceBox = el('div', 'product-info-price');
  const final = el('div', 'price-final');
  prices.forEach((row, i) => {
    const line = priceRow(row);
    if (service && i === prices.length - 2) line.classList.add('price-row-installation');
    if (i === prices.length - 1) {
      line.classList.add('price-row-total');
      if (!service) final.append(installationPriceRow());
    }
    final.append(line);
  });
  priceBox.append(final);
  out.push(priceBox);

  if (action) out.push(addToCart(action));
  ctas.forEach((row) => {
    const box = el('div', 'box-in box-contact');
    const cell = row.firstElementChild || row;
    box.append(...cell.childNodes);
    out.push(box);
  });
  block.replaceChildren(...out);
}
