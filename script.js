(() => {
  const root = document.documentElement;
  const carousel = document.getElementById('carousel');
  const cards = Array.from(carousel.children);

  function layout() {
    const n = cards.length;
    const step = 360 / n;
    cards.forEach((card, i) => {
      const rot = step * i;
      card.style.transform =
        `rotateY(${rot}deg) translateZ(var(--carousel-radius))`;
    });
  }
  layout();

  let angle = 0, autoSpin = true, dragging = false, lastX = 0, velocity = 0;
  const friction = 0.96;

  function tick() {
    if (autoSpin) angle += Number(getComputedStyle(root).getPropertyValue('--spin-speed')) || 0.03;
    angle += velocity;
    velocity *= friction;
    carousel.style.transform = `rotateY(${angle}deg)`;
    requestAnimationFrame(tick);
  }
  tick();

  const scene = document.getElementById('scene');
  scene.addEventListener('mouseenter', () => autoSpin = false);
  scene.addEventListener('mouseleave', () => autoSpin = true);

  const start = (x) => { dragging = true; autoSpin = false; lastX = x; velocity = 0; };
  const move = (x) => {
    if (!dragging) return;
    const dx = x - lastX; lastX = x;
    const sensitivity = 0.35;
    angle += dx * sensitivity;
    velocity = dx * sensitivity * 0.15;
  };
  const end = () => { dragging = false; };

  scene.addEventListener('mousedown', e => start(e.clientX));
  window.addEventListener('mousemove', e => move(e.clientX));
  window.addEventListener('mouseup', end);
  scene.addEventListener('touchstart', e => start(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', e => move(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', end);

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', e => {
      e.stopPropagation();
      card.classList.toggle('flipped');
    });
  });
})();
// navbar-----------------------------------------------------------
const toggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

toggle.addEventListener('click', () => {
  navList.classList.toggle('open');
  toggle.classList.toggle('active');
});
// price---------------------------------------------------------------
(function () {
  const onReady = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };

  onReady(() => {
    const counters = document.querySelectorAll('.counter');
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function startCount(el, duration) {
      if (el.dataset.started) return; // prevent double run
      el.dataset.started = '1';
      const target = parseInt(el.dataset.target || '0', 10);
      const startValue = parseInt(el.textContent || '0', 10) || 0;
      const total = Math.max(target - startValue, 0);
      const ms = prefersReduced ? 400 : (duration || 1200);
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / ms, 1);
        const value = Math.ceil(startValue + progress * total);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function isInViewport(el) {
      const r = el.getBoundingClientRect();
      const vh = (window.innerHeight || document.documentElement.clientHeight);
      const vw = (window.innerWidth || document.documentElement.clientWidth);
      return r.top < vh * 0.9 && r.bottom > 0 && r.left < vw && r.right > 0;
    }

    // If IO exists, use it; else fall back to scroll/resize checks
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -20% 0px' });

      counters.forEach((c) => {
        c.textContent = '0';
        // If already visible on load, IO will still fire, but we also guard with a quick sync check
        if (isInViewport(c)) startCount(c);
        observer.observe(c);
      });
    } else {
      // Fallback
      const tryStartVisible = () => counters.forEach((c) => { if (!c.dataset.started && isInViewport(c)) startCount(c); });
      counters.forEach((c) => { c.textContent = '0'; });
      tryStartVisible();
      window.addEventListener('scroll', tryStartVisible, { passive: true });
      window.addEventListener('resize', tryStartVisible);
      document.addEventListener('visibilitychange', tryStartVisible);
    }

    // Safety: if section was hidden (e.g., in a tab) and becomes visible later
    const mutationObserver = new MutationObserver(() => {
      counters.forEach((c) => { if (!c.dataset.started && isInViewport(c)) startCount(c); });
    });
    mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  });
})();
// ----------------------------------------About

(() => {
  const carousel = document.getElementById('testimonialCarousel');
  const cards = Array.from(carousel.children);

  // Arrange cards in 3D circle
  function layout() {
    const n = cards.length;
    const step = 360 / n;
    cards.forEach((card, i) => {
      card.style.transform = `rotateY(${step * i}deg) translateZ(400px)`;
    });
  }
  layout();

  // Auto spin
  let angle = 0, autoSpin = true, dragging = false, lastX = 0, velocity = 0;
  const friction = 0.95;

  function tick() {
    if (autoSpin) angle += 0.03;
    angle += velocity;
    velocity *= friction;
    carousel.style.transform = `rotateY(${angle}deg)`;
    requestAnimationFrame(tick);
  }
  tick();

  // Dragging
  const scene = document.getElementById('testimonialScene');
  const start = x => { dragging = true; autoSpin = false; lastX = x; velocity = 0; };
  const move = x => {
    if (!dragging) return;
    const dx = x - lastX;
    lastX = x;
    angle += dx * 0.3;
    velocity = dx * 0.05;
  };
  const end = () => { dragging = false; };

  scene.addEventListener('mousedown', e => start(e.clientX));
  window.addEventListener('mousemove', e => move(e.clientX));
  window.addEventListener('mouseup', end);
  scene.addEventListener('touchstart', e => start(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', e => move(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', end);

  // Navbar toggle
  const toggle = document.getElementById('testimonialMenuToggle');
  const navList = document.getElementById('testimonialNavList');
  toggle.addEventListener('click', () => navList.classList.toggle('open'));
})();
// -----------------------------testimonial
function openLightbox(img) {
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}