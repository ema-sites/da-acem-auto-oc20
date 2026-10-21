/**
 * Table — a data table (static.css .data-table-definition-list). Row 1 is the header row;
 * in body rows the first cell is the row header (<th scope="row">), the rest are data cells.
 * Authored cell content is MOVED into the table cells (EW1), never re-created.
 * @param {Element} block The table block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > table')) return; // EW9 re-entrant
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const rows = [...block.querySelectorAll(':scope > div')];
  rows.forEach((row, r) => {
    const tr = document.createElement('tr');
    [...row.querySelectorAll(':scope > div')].forEach((cell, c) => {
      const isHead = r === 0 || c === 0;
      const el = document.createElement(isHead ? 'th' : 'td');
      if (r === 0) el.setAttribute('scope', 'col');
      else if (c === 0) el.setAttribute('scope', 'row');
      el.append(...cell.childNodes);
      tr.append(el);
    });
    (r === 0 ? thead : tbody).append(tr);
  });
  table.append(thead, tbody);
  block.replaceChildren(table);
}
