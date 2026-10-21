/**
 * Search results widget — /search?q=… over the migrated pages' query index
 * (helix-query.yaml → /query-index.json). Title matches rank first; description matches
 * fill in; results are deduped by title + description; noindex rows never surface.
 * Second corpora (the source store's product catalog) are not reproduced.
 * @param {Element} widget The widget root (data-* from the authored link's query)
 */
const INDEX = '/query-index.json';
const PAGE = 500;

async function loadRows() {
  const rows = [];
  for (let offset = 0; offset < 10000; offset += PAGE) {
    // eslint-disable-next-line no-await-in-loop
    const resp = await fetch(`${INDEX}?offset=${offset}&limit=${PAGE}`);
    if (!resp.ok) break;
    // eslint-disable-next-line no-await-in-loop
    const json = await resp.json();
    rows.push(...(json.data || []));
    if (offset + PAGE >= (json.total || 0)) break;
  }
  return rows.filter((r) => !/noindex/i.test(r.robots || ''));
}

export function rank(rows, query) {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  const has = (s) => terms.every((t) => String(s || '').toLowerCase().includes(t));
  const titleHits = rows.filter((r) => has(r.title));
  const descHits = rows.filter((r) => !has(r.title) && has(r.description));
  const seen = new Set();
  return [...titleHits, ...descHits].filter((r) => {
    const key = `${r.title}|${r.description}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function item(row) {
  const li = document.createElement('li');
  li.className = 'search-result';
  const a = document.createElement('a');
  a.className = 'search-result-title';
  a.href = row.path;
  a.textContent = row.title || row.path;
  li.append(a);
  if (row.description && row.description !== 'null') {
    const p = document.createElement('p');
    p.className = 'search-result-description';
    p.textContent = row.description;
    li.append(p);
  }
  return li;
}

export default async function decorate(widget) {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get('q') || widget.dataset.q || '').trim();
  let title = widget.querySelector('.search-results-title');
  // the document's authored h1 (server-rendered) takes the template heading's place
  const authored = [...(widget.closest('.section') || document).querySelectorAll('h1')]
    .find((h) => !widget.contains(h));
  if (authored) {
    authored.classList.add('search-results-title');
    const wrapper = authored.closest('.default-content-wrapper');
    title.replaceWith(authored);
    if (wrapper && !wrapper.children.length) wrapper.remove();
    title = authored;
  }
  const input = widget.querySelector('input[name="q"]');
  const count = widget.querySelector('.search-results-count');
  const list = widget.querySelector('.search-results-list');
  input.value = query;
  if (!query) {
    count.textContent = 'Enter a search term.';
    return;
  }
  title.textContent = `Search results for: '${query}'`;
  let rows = [];
  try {
    rows = await loadRows();
  } catch (e) {
    rows = [];
  }
  const hits = rank(rows, query);
  count.textContent = hits.length
    ? `${hits.length} result${hits.length === 1 ? '' : 's'}`
    : 'Your search returned no results.';
  list.replaceChildren(...hits.map(item));
}
