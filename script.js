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

const monthlyBtn = document.getElementById("monthlyBtn");
const annualBtn = document.getElementById("annualBtn");
const prices = document.querySelectorAll(".price");

monthlyBtn.addEventListener("click", () => {
  monthlyBtn.classList.add("active");
  annualBtn.classList.remove("active");
  prices.forEach(price => {
    price.textContent = price.getAttribute("data-monthly");
  });
});

annualBtn.addEventListener("click", () => {
  annualBtn.classList.add("active");
  monthlyBtn.classList.remove("active");
  prices.forEach(price => {
    price.textContent = price.getAttribute("data-annual");
  });
});
// -------------------------------------------------------------
// Counter animation
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100; // speed of counting

    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

  // Trigger when in viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, {threshold: 0.5});

  observer.observe(counter);
});

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
    if(autoSpin) angle += 0.03;
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
    if(!dragging) return;
    const dx = x - lastX;
    lastX = x;
    angle += dx * 0.3;
    velocity = dx * 0.05;
  };
  const end = () => { dragging = false; };

  scene.addEventListener('mousedown', e => start(e.clientX));
  window.addEventListener('mousemove', e => move(e.clientX));
  window.addEventListener('mouseup', end);
  scene.addEventListener('touchstart', e => start(e.touches[0].clientX), {passive:true});
  window.addEventListener('touchmove', e => move(e.touches[0].clientX), {passive:true});
  window.addEventListener('touchend', end);

  // Navbar toggle
  const toggle = document.getElementById('testimonialMenuToggle');
  const navList = document.getElementById('testimonialNavList');
  toggle.addEventListener('click', () => navList.classList.toggle('open'));
})();
// -----------------------------testimonial
 

        // ________________________________skills


        // contact 

        