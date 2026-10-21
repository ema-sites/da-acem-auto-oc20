import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/*
 * Header — template-slotted chrome (canon.css § header + § dark search strip).
 * Content comes from the authored /nav document, one section per role:
 *   1 brand (logo link) · 2 menu (tab labels <p> + nav <ul>) ·
 *   3 tools (cart link <p>, empty-cart <p>, account <ul>) · 4 search strip
 *   (search link <p> → form action + placeholder, version <p>).
 * Authored nodes are MOVED into empty slots (EW1); behaviour per canon.js and
 * stardust/chrome/header-contract.json: nav links navigate (no menus), cart click
 * toggles the "My Cart" dropdown, the mobile toggle slides the drawer in.
 * @ew-exempt all auth-popup — the source's hidden checkout/login popup (captured Magento
 *   chrome, never displayed); its strings live in code, appended hidden to <main>.
 * @ew-exempt <p> search link (strip section) — text-as-metadata: the link text is the
 *   input placeholder and the href the form action; the authored paragraph stays in the
 *   DOM, hidden.
 */

const MOBILE = window.matchMedia('(width <= 767px)');

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/** authored elements of a fragment section, in order (default content only) */
function authored(section) {
  if (!section) return [];
  return [...section.querySelectorAll(':scope > .default-content-wrapper > *')];
}

/** presentational copy: drop the workspace instrumentation (EW4) */
function stripInstrumentation(node) {
  [node, ...node.querySelectorAll('*')].forEach((n) => {
    ['data-prose-index', 'data-image-index', 'data-block-index'].forEach((a) => n.removeAttribute(a));
  });
  return node;
}

const SOURCE = 'https://commercemarketplace.adobe.com';

/** the source's hidden auth popup (as captured in the prototype), carried hidden in <main> */
function buildAuthPopup() {
  const popup = el('div', 'auth-popup');
  popup.hidden = true;
  const add = (parent, tag, className, text, attrs) => {
    const node = el(tag, className, attrs);
    if (text) node.textContent = text;
    parent.append(node);
    return node;
  };
  const fresh = add(popup, 'div', 'block-new-customer');
  const freshTitle = add(fresh, 'div', 'block-title');
  add(freshTitle, 'strong', '', 'Checkout as a new customer', { role: 'heading', 'aria-level': '2' });
  const freshContent = add(fresh, 'div', 'block-content');
  add(freshContent, 'p', '', 'Creating an account has many benefits:');
  const benefits = add(freshContent, 'ul');
  ['See order and shipping status', 'Track order history', 'Check out faster']
    .forEach((t) => add(benefits, 'li', '', t));
  const register = add(add(freshContent, 'div', 'actions-toolbar'), 'a', 'action-register', '', {
    href: `${SOURCE}/customer/account/create/`,
  });
  add(register, 'span', '', 'Create an Account');

  const login = add(popup, 'div', 'block-customer-login');
  const loginTitle = add(login, 'div', 'block-title');
  add(loginTitle, 'strong', '', 'Checkout using your account', { role: 'heading', 'aria-level': '2' });
  const form = add(login, 'form', 'form-login');
  [['customer-email', 'email', 'Email Address'], ['pass', 'password', 'Password']]
    .forEach(([id, type, text]) => {
      const field = add(form, 'div', 'field');
      add(add(field, 'label', '', '', { for: id }), 'span', '', text);
      add(field, 'input', '', '', { id, type });
    });
  const actions = add(form, 'div', 'actions-toolbar');
  add(add(actions, 'button', '', '', { type: 'submit' }), 'span', '', 'Sign In');
  const forgot = add(actions, 'a', '', '', { href: `${SOURCE}/customer/account/forgotpassword/` });
  add(forgot, 'span', '', 'Forgot Your Password?');
  return popup;
}

function setDrawer(open, toggle) {
  const root = document.documentElement;
  if (open) {
    root.classList.add('nav-before-open');
    requestAnimationFrame(() => root.classList.add('nav-open'));
  } else {
    root.classList.remove('nav-open');
    setTimeout(() => root.classList.remove('nav-before-open'), 300);
  }
  toggle.setAttribute('aria-expanded', String(open));
}

function buildBrand(slot, items) {
  items.forEach((item) => slot.append(item));
  const link = slot.querySelector('a');
  if (link && !link.getAttribute('aria-label')) link.setAttribute('aria-label', 'store logo');
  const img = slot.querySelector('img');
  if (img) {
    img.loading = 'eager';
    img.width = 90;
    img.height = 23;
  }
}

function buildMenu(navSections, items) {
  const navigation = el('nav', 'navigation', { id: 'store-menu' });
  let tabs = 0;
  items.forEach((item) => {
    if (item.matches('ul, ol')) {
      // presentation refinement (source markup <a><span>label</span></a>): move the label in
      item.querySelectorAll('a').forEach((a) => {
        if (a.querySelector(':scope > span')) return;
        const label = el('span');
        label.append(...a.childNodes);
        a.append(label);
      });
      navigation.append(item);
    } else {
      const title = el('div', `nav-sections-title${tabs === 0 ? ' active' : ''}`);
      title.append(item);
      navSections.append(title);
      tabs += 1;
    }
  });
  navSections.append(navigation);
}

function buildTools(actions, items) {
  const minicart = el('div', 'minicart');
  const dropdown = el('div', 'minicart-dropdown', { role: 'dialog' });
  dropdown.hidden = true;
  const content = el('div', 'minicart-content');
  const close = el('button', 'minicart-close', { type: 'button', 'aria-label': 'Close' });
  const subtitle = el('div', 'subtitle');
  content.append(close, subtitle);
  dropdown.append(content);
  const links = el('div', 'header-links');

  items.forEach((item) => {
    if (item.matches('ul, ol')) {
      links.append(item);
    } else if (item.querySelector('a') && !minicart.querySelector('a')) {
      minicart.append(item);
    } else {
      subtitle.append(item);
    }
  });
  minicart.append(dropdown);

  const trigger = minicart.querySelector('a');
  if (trigger) {
    // presentation refinement: icon glyph + the authored text node moved into a hidden span
    const text = el('span', 'text');
    text.append(...trigger.childNodes);
    trigger.append(el('span', 'icon-cart', { 'aria-hidden': 'true' }), text);
    trigger.setAttribute('aria-expanded', 'false');
    const setOpen = (open) => {
      minicart.classList.toggle('active', open);
      dropdown.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
    };
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      setOpen(!minicart.classList.contains('active'));
    });
    close.addEventListener('click', () => setOpen(false));
    document.addEventListener('click', (e) => {
      if (!minicart.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && minicart.classList.contains('active')) {
        setOpen(false);
        trigger.focus();
      }
    });
  }
  actions.append(minicart, links);
  return links;
}

function buildStrip(strip, items) {
  const content = el('div', 'strip-content');
  const blockSearch = el('div', 'block-search');
  const version = el('div', 'version-info');
  const source = el('div', 'search-source');
  source.hidden = true;
  items.forEach((item) => {
    if (item.querySelector('a') && !source.firstChild) source.append(item);
    else version.append(item);
  });

  const link = source.querySelector('a');
  const form = el('form', 'minisearch', { method: 'get', role: 'search' });
  form.action = link ? link.href : '/';
  const label = el('label', 'visually-hidden', { for: 'search' });
  label.textContent = 'Search';
  const field = el('div', 'search-input-container');
  const input = el('input', '', {
    id: 'search', type: 'text', name: 'q', autocomplete: 'off',
  });
  if (link) input.placeholder = link.textContent;
  field.append(input, el('span', 'search-icon', { 'aria-hidden': 'true' }));
  const submit = el('button', 'search-submit', { type: 'submit' });
  submit.textContent = 'Search';
  form.append(label, field, submit);
  blockSearch.append(form, source);
  content.append(blockSearch, version);
  strip.append(content);
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  if (!fragment) return;
  const [brand, menu, tools, search] = [...fragment.querySelectorAll(':scope > .section')];

  const pageHeader = el('div', 'page-header');
  const headerContent = el('div', 'header-content container');
  const toggle = el('button', 'nav-toggle', {
    type: 'button', 'aria-controls': 'nav-sections', 'aria-expanded': 'false', 'aria-label': 'Toggle Nav',
  });
  const toggleLabel = el('span');
  toggleLabel.textContent = 'Toggle Nav';
  toggle.append(toggleLabel);
  const logo = el('div', 'logo');
  const navSections = el('div', 'nav-sections', { id: 'nav-sections' });
  const actions = el('div', 'header-actions');

  buildBrand(logo, authored(brand));
  buildMenu(navSections, authored(menu));
  const links = buildTools(actions, authored(tools));
  // the source repeats the account list inside the drawer (ul.nav-sections-links, hidden)
  const accountList = links.querySelector('ul, ol');
  if (accountList) {
    const drawerLinks = stripInstrumentation(accountList.cloneNode(true));
    drawerLinks.className = 'nav-sections-links';
    drawerLinks.id = 'store-links';
    navSections.append(drawerLinks);
  }
  headerContent.append(toggle, logo, navSections, actions);
  pageHeader.append(headerContent);

  const strip = el('div', 'search-strip');
  buildStrip(strip, authored(search));

  toggle.addEventListener('click', () => {
    setDrawer(!document.documentElement.classList.contains('nav-open'), toggle);
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && document.documentElement.classList.contains('nav-open')) {
      setDrawer(false, toggle);
      toggle.focus();
    }
  });
  MOBILE.addEventListener('change', () => {
    if (!MOBILE.matches && document.documentElement.classList.contains('nav-before-open')) {
      setDrawer(false, toggle);
    }
  });

  block.replaceChildren(pageHeader, strip);

  const main = document.querySelector('main');
  if (main && !main.querySelector('.auth-popup')) main.append(buildAuthPopup());
}
