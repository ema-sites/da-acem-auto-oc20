/* contents side-nav scroll-spy (live: spectrum-SideNav-item.is-selected follows the section in view) */
(() => {
  const items = [...document.querySelectorAll('.contents-nav .sidenav-item a[href^="#"]')]
    .map((a) => ({ li: a.parentElement, target: document.getElementById(a.getAttribute('href').slice(1)) }))
    .filter((i) => i.target);
  if (!items.length) return;
  let current = items.find((i) => i.li.classList.contains('is-selected')) || null;
  const update = () => {
    let next = items[0];
    items.forEach((i) => { if (i.target.getBoundingClientRect().top <= 120) next = i; });
    if (next === current) return;
    if (current) current.li.classList.remove('is-selected');
    next.li.classList.add('is-selected');
    current = next;
  };
  window.addEventListener('scroll', update, { passive: true });
})();
