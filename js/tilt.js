/**
 * tilt.js — v2
 * 3D mouse-tracking perspective tilt for cards and chips.
 * Targets updated selectors from the v3 design system.
 */
(function () {
  'use strict';

  const targets = document.querySelectorAll(
    '.skill-node, .project-card, .stat-item, .ach-card, .cert-card'
  );

  targets.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left  - rect.width  / 2;
      const y = e.clientY - rect.top   - rect.height / 2;
      const rx = -(y / rect.height) * 7;
      const ry =  (x / rect.width)  * 7;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
