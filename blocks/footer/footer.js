import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/*
 * Footer — canon.css § footer (+ program.css become-partner band). Content comes from the
 * authored /footer document, one section per band:
 *   1 become-a-partner band (heading + CTA; shown on product pages only, CSS)
 *   2 link columns (reconstructive: each heading opens a column, the list after it is its nav)
 *   3 logo / version / social list · 4 copyright + legal links.
 * Authored nodes are MOVED into the slots (EW1); the wrappers carry the classes (EW2).
 */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function authored(section) {
  if (!section) return [];
  return [...section.querySelectorAll(':scope > .default-content-wrapper > *')];
}

function buildPartner(items) {
  const band = el('div', 'become-partner');
  items.forEach((item) => band.append(item));
  return band;
}

function buildColumns(items) {
  const top = el('div', 'footer-top container');
  let col = null;
  items.forEach((item) => {
    if (/^H[1-6]$/.test(item.tagName) || !col) {
      col = el('div', 'footer-nav-col');
      top.append(col);
    }
    if (item.matches('ul, ol')) {
      const nav = el('div', 'footer-nav');
      nav.append(item);
      col.append(nav);
      // the source renders the current page's nav item as text, not a link
      const here = window.location.pathname.replace(/(\.html|\/)$/, '');
      item.querySelectorAll(':scope > li > a').forEach((a) => {
        const path = new URL(a.href, window.location).pathname.replace(/(\.html|\/)$/, '');
        if (!here || path !== here || new URL(a.href).host !== window.location.host) return;
        const text = el('strong');
        text.append(...a.childNodes);
        a.parentElement.classList.add('current');
        a.replaceWith(text);
      });
    } else {
      col.append(item);
    }
  });
  return top;
}

function buildLogoLinks(items) {
  const row = el('div', 'case-logo-links');
  const logo = el('div', 'footer-section');
  const version = el('div', 'footer-section');
  const social = el('div', 'footer-section');
  items.forEach((item) => {
    if (item.matches('ul, ol')) {
      const list = el('div', 'social-list');
      list.append(item);
      social.append(list);
    } else if (item.querySelector('img, .icon')) {
      logo.append(item);
    } else {
      const info = el('div', 'version-info');
      info.append(item);
      version.append(info);
    }
  });
  // social links: icon glyph from CSS, the authored label moved into a hidden span
  social.querySelectorAll('a').forEach((a) => {
    if (a.querySelector('.text')) return;
    const text = el('span', 'text');
    text.append(...a.childNodes);
    const network = ['facebook', 'twitter', 'linkedin'].find((n) => a.href.includes(n));
    const icon = el('span', `icon${network ? ` icon-${network}` : ''}`);
    icon.setAttribute('aria-hidden', 'true');
    a.append(icon, text);
    if (!a.getAttribute('aria-label')) a.setAttribute('aria-label', text.textContent);
  });
  const img = logo.querySelector('img');
  if (img) {
    if (!img.alt) img.alt = 'Adobe Commerce';
    img.width = 90;
    img.height = 23;
  }
  row.append(logo, version, social);
  return row;
}

function buildLegal(bottom, items) {
  items.forEach((item) => {
    const slot = el('div', item.matches('ul, ol') ? 'footer-links' : 'copyright');
    slot.append(item);
    bottom.append(slot);
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;
  const [partner, columns, logoLinks, legal] = [...fragment.querySelectorAll(':scope > .section')];

  const footer = el('div', 'page-footer');
  const bottom = el('div', 'footer-bottom container');
  bottom.append(buildLogoLinks(authored(logoLinks)));
  buildLegal(bottom, authored(legal));
  footer.append(buildPartner(authored(partner)), buildColumns(authored(columns)), bottom);
  block.replaceChildren(footer);
}
