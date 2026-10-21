/**
 * Breadcrumbs — the authored trail is ONE list (a list is one editable unit, EW5):
 * ancestors as links, the current page as <strong>. The list is MOVED into a
 * <nav aria-label="Breadcrumb"> (EW1); styling is per page template (body class).
 * @param {Element} block The breadcrumbs block element
 */
export default function decorate(block) {
  if (block.querySelector(':scope > nav')) return; // EW9 re-entrant
  const list = block.querySelector('ul, ol');
  if (!list) return;
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.append(list);
  block.replaceChildren(nav);
}
