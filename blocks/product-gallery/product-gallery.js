/**
 * Product gallery — the product page's left column: headline (icon, title, vendor,
 * partner badge) above the captured fotorama gallery (stage + thumb strip, dots ≤767px).
 *
 * Content model:
 *   row 1 (the row holding the h1): | icon image | h1, "by <vendor link>" paragraph,
 *                                                  partner-badge image paragraph |
 *   rows 2…n: one gallery image per row, in gallery order (the first is the stage image).
 *
 * Decode tier: template-slotted headline (authored h1 / p / picture MOVED into the
 * prototype's slots) + reconstructive gallery (every gallery picture moved into its thumb).
 * The stage frame shows a presentational clone of the active image (EW4, instrumentation
 * stripped). Gallery arrows / thumbs carry no behaviour — the live fotorama shows no
 * sampled change on click (replica progress.json motion.dead).
 * @ew-exempt structure: skip-link labels and thumb aria-labels are gallery chrome (source
 *   fotorama markup), derived from the image alts — no authored text is rebuilt.
 * @param {Element} block The product-gallery block element
 */

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/** presentational copy: drop the workspace instrumentation (EW4) */
function stripInstrumentation(node) {
  [node, ...node.querySelectorAll('*')].forEach((n) => {
    ['data-prose-index', 'data-image-index', 'data-block-index'].forEach((a) => n.removeAttribute(a));
  });
  return node;
}

function skipLink(href, label) {
  const wrap = el('div', 'action-skip-wrapper');
  const a = el('a', 'action-skip', { href });
  const span = el('span');
  span.textContent = label;
  a.append(span);
  wrap.append(a);
  return wrap;
}

/** calls fn(width, height) with the image's intrinsic size (attributes, else once loaded) */
function onSize(img, fn) {
  const w = parseInt(img.getAttribute('width'), 10);
  const h = parseInt(img.getAttribute('height'), 10);
  if (w && h) {
    fn(w, h);
  } else if (img.complete && img.naturalWidth) {
    fn(img.naturalWidth, img.naturalHeight);
  } else {
    img.addEventListener('load', () => fn(img.naturalWidth, img.naturalHeight), { once: true });
  }
}

/** horizontal-ratio images fit the 80px thumb height; the square icon fills the width */
function fitThumb(thumb, img) {
  onSize(img, (w, h) => thumb.classList.toggle('gallery-thumb--fit-h', w > h));
}

function buildHeadline(row) {
  const h1 = row.querySelector('h1');
  const headline = el('div', 'product-headline');
  const titleWrap = el('div', 'page-title-wrapper');
  const icon = el('div', 'ico-product');
  const title = el('div', 'headline-title');
  const company = el('div', 'by-company');
  const vendor = el('div', 'vendor-name');

  // icon: the picture in the row's other cell
  const cells = [...row.children];
  const textCell = cells.find((c) => c.contains(h1)) || h1.parentElement;
  const iconCell = cells.find((c) => c !== textCell && c.querySelector('picture, img'));
  if (iconCell) icon.append(iconCell.querySelector('picture') || iconCell.querySelector('img'));

  // title: mirror the source page-title markup (h1.page-title > span.base), nodes moved
  h1.classList.add('page-title');
  if (!h1.querySelector(':scope > span.base')) {
    const base = el('span', 'base');
    base.append(...h1.childNodes);
    h1.append(base);
  }
  title.append(h1);

  // the remaining text-cell elements: vendor line(s) and the partner badge
  [...textCell.children].forEach((child) => {
    if (child.querySelector('picture, img') && !child.textContent.trim()) {
      company.append(child);
    } else {
      vendor.append(child);
    }
  });
  company.prepend(vendor);
  title.append(company);
  titleWrap.append(icon, title);
  headline.append(titleWrap);
  return headline;
}

function buildGallery(pictures) {
  const gallery = el('div', 'gallery');
  const stage = el('div', 'gallery-stage');
  const shaft = el('div', 'gallery-shaft');
  const navWrap = el('div', 'gallery-nav-wrap');
  const nav = el('div', 'gallery-nav');
  const navShaft = el('div', 'gallery-nav-shaft');

  const imgOf = (p) => (p.tagName === 'IMG' ? p : p.querySelector('img'));
  const thumbs = [];
  const dots = [];
  pictures.forEach((pic, i) => {
    const img = imgOf(pic);
    const label = img ? img.getAttribute('alt') || '' : '';
    const thumb = el('div', `gallery-thumb${i === 0 ? ' is-active' : ''}`, { role: 'button', 'aria-label': label });
    const box = el('div', 'thumb-img');
    box.append(pic);
    thumb.append(box);
    if (img) fitThumb(thumb, img);
    thumbs.push(thumb);
    dots.push(el('div', `gallery-dot${i === 0 ? ' is-active' : ''}`, { role: 'button', 'aria-label': label }));
  });

  if (pictures.length) {
    const first = pictures[0];
    const firstImg = imgOf(first);
    const frame = el('a', 'gallery-frame is-active', { href: firstImg ? firstImg.currentSrc || firstImg.src : '' });
    const clone = stripInstrumentation(first.cloneNode(true));
    const cloneImg = imgOf(clone);
    if (cloneImg) {
      cloneImg.loading = 'eager';
      onSize(cloneImg, (w, h) => frame.classList.toggle('gallery-frame-square', w === h));
    }
    frame.append(clone);
    shaft.append(frame);
  }

  const prev = el('div', 'gallery-arr gallery-arr-prev', { role: 'button', 'aria-label': 'Previous' });
  const next = el('div', 'gallery-arr gallery-arr-next', { role: 'button', 'aria-label': 'Next' });
  prev.append(el('span'));
  next.append(el('span'));
  // fotorama controls present but not shown in the captured state (gallery.css)
  const fullscreen = el('div', 'gallery-fullscreen-icon', { role: 'button', 'aria-label': 'Exit fullscreen' });
  const zoomIn = el('div', 'gallery-zoom-in', { role: 'button', 'aria-label': 'Zoom in' });
  const zoomOut = el('div', 'gallery-zoom-out', { role: 'button', 'aria-label': 'Zoom out' });
  stage.append(shaft, fullscreen, prev, next, zoomIn, zoomOut);

  const thumbArr = (side, label) => {
    const arr = el('div', `gallery-thumb-arr gallery-thumb-arr-${side}`, { role: 'button', 'aria-label': label });
    arr.append(el('div', 'thumb-icon'));
    return arr;
  };
  navShaft.append(...thumbs, ...dots);
  nav.append(thumbArr('left', 'Previous'), navShaft, thumbArr('right', 'Next'));
  navWrap.append(nav);
  gallery.append(stage, navWrap);
  return gallery;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .product-headline')) return; // EW9 re-entrant
  const rows = [...block.children];
  const headRow = rows.find((r) => r.querySelector('h1'));
  const pictures = [];
  rows.filter((r) => r !== headRow).forEach((row) => {
    row.querySelectorAll('picture, img').forEach((p) => {
      if (p.tagName === 'IMG' && p.closest('picture')) return;
      pictures.push(p);
    });
  });

  const out = [];
  if (headRow) out.push(buildHeadline(headRow));
  out.push(el('a', '', { id: 'gallery-prev-area' }));
  out.push(skipLink('#gallery-next-area', 'Skip to the end of the images gallery'));
  out.push(buildGallery(pictures));
  out.push(skipLink('#gallery-prev-area', 'Skip to the beginning of the images gallery'));
  out.push(el('a', '', { id: 'gallery-next-area' }));
  block.replaceChildren(...out);
}
