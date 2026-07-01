/**
 * parallax.js
 * Dual parallax effect for the hero floating orbs:
 *   1. Scroll parallax – orbs shift vertically based on scroll position.
 *   2. Mouse parallax  – orbs drift with the mouse for a 3-D depth feel.
 *
 * Note: mousemove takes priority over scroll transform to avoid conflicts;
 * both are kept lightweight with passive event listeners.
 */

(function () {
  'use strict';

  const orbs = document.querySelectorAll('.floating-orb');
  if (!orbs.length) return;

  /* Scroll parallax */
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = i === 0 ? 0.15 : 0.1;
      orb.style.transform = `translateY(${sy * speed}px)`;
    });
  }, { passive: true });

  /* Mouse parallax (overrides scroll when mouse moves) */
  document.addEventListener('mousemove', (e) => {
    const cx = e.clientX / window.innerWidth  - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, i) => {
      const depth = i === 0 ? 20 : 15;
      orb.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  });
})();
