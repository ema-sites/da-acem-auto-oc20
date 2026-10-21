/* landing.js — only the home behaviours motion-observe saw fire on the live page
   (stardust/replica/motion/index.json):
   1. hero slider autoplay: the current slide advances with no interaction (PageBuilder slider
      data-autoplay="true" data-autoplay-speed="4000" data-infinite-loop="false"); the track moves by
      transform with a 0.5s transition; slick without infinite loop runs forward to the last slide
      and then back.
   2. dot click: shows that slide (slick-dots → slick-current/slick-active class moves). */
(() => {
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('.slider-track');
    const slides = [...slider.querySelectorAll('.slide')];
    const dots = [...slider.querySelectorAll('.slider-dots li')];
    if (!track || slides.length < 2) return;
    let current = 0;
    let forward = true;
    const go = (i) => {
      current = i;
      track.style.transform = `translate3d(${-100 * i}%, 0, 0)`;
      slides.forEach((s, n) => {
        const on = n === i;
        s.classList.toggle('is-current', on);
        s.setAttribute('aria-hidden', String(!on));
        s.querySelectorAll('a, button').forEach((el) => { if (on) el.removeAttribute('tabindex'); else el.setAttribute('tabindex', '-1'); });
      });
      dots.forEach((d, n) => {
        const on = n === i;
        d.classList.toggle('is-active', on);
        const b = d.querySelector('button');
        b.setAttribute('aria-selected', String(on));
        if (on) b.removeAttribute('tabindex'); else b.setAttribute('tabindex', '-1');
      });
    };
    const step = () => {
      if (forward && current === slides.length - 1) forward = false;
      else if (!forward && current === 0) forward = true;
      go(current + (forward ? 1 : -1));
    };
    let timer = setInterval(step, 4000);
    dots.forEach((d, n) => d.querySelector('button').addEventListener('click', () => {
      go(n);
      clearInterval(timer);
      timer = setInterval(step, 4000);
    }));
  });
})();
