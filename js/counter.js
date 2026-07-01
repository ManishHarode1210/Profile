/**
 * counter.js
 * Animated count-up for statistic numbers.
 * Uses IntersectionObserver to trigger only when the element is in view.
 * Applies a smooth cubic ease-out easing curve over 1800ms.
 */

(function () {
  'use strict';

  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const DURATION = 1800; /* Animation duration in milliseconds */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const start  = performance.now();

        function update(now) {
          const elapsed  = Math.min((now - start) / DURATION, 1);
          const eased    = 1 - Math.pow(1 - elapsed, 3); /* Cubic ease-out */
          el.textContent = Math.round(eased * target);
          if (elapsed < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el); /* Animate only once */
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
})();
