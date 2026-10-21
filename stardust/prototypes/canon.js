/* canon.js — only the behaviours motion-observe saw fire on the live page
   (stardust/replica/motion/extensions-html*.json):
   1. minicart: click on the cart toggles .active and the "My Cart" dropdown (live: .minicart-wrapper.active)
   2. mobile nav: the toggle adds html.nav-before-open + html.nav-open (drawer slides in)
   3. listing refine toggle (mobile): toggles .active, which shows the facets */
(() => {
  const root = document.documentElement;

  const cart = document.querySelector('.page-header .minicart');
  if (cart) {
    const trigger = cart.querySelector('.showcart');
    const panel = cart.querySelector('.minicart-dropdown');
    const setOpen = (open) => {
      cart.classList.toggle('active', open);
      if (panel) panel.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
    };
    trigger.addEventListener('click', (e) => { e.preventDefault(); setOpen(!cart.classList.contains('active')); });
    cart.querySelector('.minicart-close')?.addEventListener('click', () => setOpen(false));
    document.addEventListener('click', (e) => { if (!cart.contains(e.target)) setOpen(false); });
  }

  const navToggle = document.querySelector('.page-header .nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = !root.classList.contains('nav-open');
      if (open) {
        root.classList.add('nav-before-open');
        requestAnimationFrame(() => root.classList.add('nav-open'));
      } else {
        root.classList.remove('nav-open');
        setTimeout(() => root.classList.remove('nav-before-open'), 300);
      }
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.refine-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = !btn.classList.contains('active');
      btn.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();
