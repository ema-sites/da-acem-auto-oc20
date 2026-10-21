/**
 * hero-carousel — home banner slider (source: PageBuilder slider in .block-banners).
 *
 * Authoring rows (classified by content, not position):
 *   - the page heading (h1) is default content before the block (reabsorbed, EW8; a
 *     heading row inside the block is accepted too) — kept for SEO/AT, visually hidden
 *     (the source copy is baked into the banner images)
 *   - every row holding an image = one slide; cells:
 *       images: 1st = desktop rendition, 2nd (optional) = mobile rendition (<= 767px)
 *       link:   the slide target; its label is the orange call-to-action
 *       config (optional): `padding: <css>; size: auto|cover` — the PageBuilder overlay
 *               padding that positions the call-to-action over the banner art
 * Behaviour (live motion): autoplay every 4000 ms, 0.5 s transform, no infinite loop
 * (forward to the last slide, then back), dot click selects a slide; like slick, autoplay
 * pauses while the document is hidden and while the slider is hovered or focused; it is
 * armed with the EDS delayed phase (window load + 3 s), as the source slider starts late.
 *
 * @ew-exempt config — the `padding: …; size: …` cell is slide configuration, not copy
 */

function el(tag, className) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  return n;
}

function wrapNode(node, className) {
  const w = el('div', className);
  w.append(node);
  return w;
}

// read-only classification helper — never used to produce displayed text (EW1)
const text = (n) => (n ? n.textContent.trim() : '');

function parseConfig(cfgText) {
  const cfg = {};
  cfgText.split(';').forEach((pair) => {
    const i = pair.indexOf(':');
    if (i < 0) return;
    const key = pair.slice(0, i).trim().toLowerCase();
    const value = pair.slice(i + 1).trim();
    if (key && value) cfg[key] = value;
  });
  return cfg;
}

function buildSlide(row, index) {
  const pictures = [...row.querySelectorAll('picture')];
  const imgsOnly = pictures.length ? [] : [...row.querySelectorAll('img')];
  const media = pictures.length ? pictures : imgsOnly;
  const link = row.querySelector('a[href]');
  const cfgCell = [...row.children].find((c) => !c.querySelector('picture, img, a')
    && /:/.test(text(c)));
  const cfg = cfgCell ? parseConfig(text(cfgCell)) : {};

  const slide = el('div', 'slide');
  slide.setAttribute('role', 'tabpanel');
  slide.id = `hero-slide-${index + 1}`;

  // the authored CTA link stays the slide's link; CSS stretches its hit area over the slide
  const host = el('div', 'slide-link');
  const wrapper = el('div', 'slide-wrapper');
  if (cfg.size === 'auto') wrapper.classList.add('slide-size-auto');

  const mediaBox = el('div', 'slide-media');
  media.forEach((m, n) => {
    const img = m.tagName === 'IMG' ? m : m.querySelector('img');
    if (img) {
      img.loading = 'eager';
      if (cfg.size === 'auto' && img.getAttribute('width')) {
        img.style.width = `${img.getAttribute('width')}px`;
        img.style.height = `${img.getAttribute('height')}px`;
      }
    }
    let kind = 'slide-image';
    if (media.length > 1) kind = n === 0 ? 'slide-image slide-image-desktop' : 'slide-image slide-image-mobile';
    mediaBox.append(wrapNode(m.closest('p') || m, kind));
  });

  const overlay = el('div', 'slide-overlay');
  if (cfg.padding) overlay.style.padding = cfg.padding;
  const content = el('div', 'slide-content');
  content.append(el('div', 'slide-text'));
  if (link) {
    // EW3: the CTA moves as its paragraph
    const btn = el('div', 'slide-button');
    btn.append(link.closest('p') || link);
    content.append(btn);
  }
  overlay.append(content);
  wrapper.append(mediaBox, overlay);
  host.append(wrapper);
  slide.append(host);
  // the config cell (@ew-exempt config) is consumed: it styles the overlay, it is not copy
  return slide;
}

function startCarousel(slider, track, slides, dots) {
  let current = 0;
  let forward = true;
  const go = (i) => {
    current = i;
    track.style.transform = `translate3d(${-100 * i}%, 0, 0)`;
    slides.forEach((s, n) => {
      const on = n === i;
      s.classList.toggle('is-current', on);
      s.setAttribute('aria-hidden', String(!on));
      s.querySelectorAll('a, button').forEach((a) => {
        if (on) a.removeAttribute('tabindex');
        else a.setAttribute('tabindex', '-1');
      });
    });
    dots.forEach((d, n) => {
      const on = n === i;
      d.classList.toggle('is-active', on);
      const b = d.querySelector('button');
      b.setAttribute('aria-selected', String(on));
      if (on) b.removeAttribute('tabindex');
      else b.setAttribute('tabindex', '-1');
    });
  };
  const step = () => {
    if (forward && current === slides.length - 1) forward = false;
    else if (!forward && current === 0) forward = true;
    go(current + (forward ? 1 : -1));
  };
  go(0);
  if (slides.length < 2) return;
  // slick autoplay semantics: paused while the document is hidden, while hovered or focused
  let timer = null;
  let armed = false;
  let hovered = false;
  let focused = false;
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    if (!armed || document.hidden || hovered || focused) return;
    timer = setInterval(step, 4000);
  };
  document.addEventListener('visibilitychange', start);
  slider.addEventListener('mouseenter', () => {
    hovered = true;
    stop();
  });
  slider.addEventListener('mouseleave', () => {
    hovered = false;
    start();
  });
  slider.addEventListener('focusin', () => {
    focused = true;
    stop();
  });
  slider.addEventListener('focusout', () => {
    focused = false;
    start();
  });
  dots.forEach((d, n) => d.querySelector('button').addEventListener('click', () => {
    go(n);
    start();
  }));
  // the source slider initialises with the page's deferred scripts (live: first advance
  // ~7.5 s after navigation); arm autoplay with the EDS delayed phase (load + 3 s)
  const arm = () => setTimeout(() => {
    armed = true;
    start();
  }, 3000);
  if (document.readyState === 'complete') arm();
  else window.addEventListener('load', arm, { once: true });
}

export default function decorate(block) {
  if (block.querySelector(':scope > .block-banners')) return; // EW9 re-entrant
  const rows = [...block.children];
  const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
  const slideRows = rows.filter((r) => r.querySelector('picture, img'));
  const leftovers = rows.filter((r) => !slideRows.includes(r) && !r.contains(heading));

  const banners = el('div', 'block-banners');
  const collapse = el('div', 'banner-collapse');
  const row = el('div', 'banner-row');
  const slider = el('div', 'hero-slider');
  const list = el('div', 'slider-list');
  const track = el('div', 'slider-track');
  const slides = slideRows.map((r, i) => buildSlide(r, i));
  track.append(...slides);
  list.append(track);
  slider.append(list);

  const dots = [];
  if (slides.length > 1) {
    // slick-dots: the source's slick class (capture tooling resets carousels via it)
    const ul = el('ul', 'slider-dots slick-dots');
    ul.setAttribute('role', 'tablist');
    slides.forEach((s, i) => {
      const li = el('li');
      li.setAttribute('role', 'presentation');
      const b = el('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', s.id);
      b.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
      b.textContent = String(i + 1);
      li.append(b);
      ul.append(li);
      dots.push(li);
    });
    slider.append(ul);
  }
  row.append(slider);
  collapse.append(row);
  banners.append(collapse);

  const out = [];
  const head = el('div', 'hero-carousel-heading visually-hidden');
  // EW8: reabsorb the section head (default content before the block)
  const prev = block.parentElement && block.parentElement.previousElementSibling;
  if (prev && prev.classList.contains('default-content-wrapper')) {
    head.append(...prev.childNodes);
    prev.remove();
  }
  if (heading) head.append(heading);
  if (head.childNodes.length) out.push(head);
  out.push(banners);
  // leftovers pass: any authored row that is neither heading nor slide stays in the block
  leftovers.forEach((r) => {
    const extra = el('div', 'hero-carousel-extra');
    extra.append(...r.childNodes);
    if (text(extra)) out.push(extra);
  });
  block.replaceChildren(...out);
  startCarousel(slider, track, slides, dots);
}
