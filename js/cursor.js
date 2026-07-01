/**
 * cursor.js — v3 (Zero-Latency Edition)
 * Custom magnetic cursor with dot and trailing ring.
 * Uses GPU-accelerated translate3d to bypass reflow/repaint pipelines.
 * Synchronizes updates within the requestAnimationFrame cycle to prevent micro-stutters.
 */
(function () {
  'use strict';

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0; // Mouse Target Coordinates
  let dx = 0, dy = 0; // Current Dot Coordinates
  let rx = 0, ry = 0; // Current Ring Coordinates

  // Snappy interpolation factor for trailing ring (increased from 0.12 to 0.22)
  const interpolationFactor = 0.22;

  // Track target coordinates continuously
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  // Main rendering loop synchronized with browser paint cycles
  function renderCursor() {
    // Dot follows target immediately with zero lag
    dx = mx;
    dy = my;
    dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;

    // Ring trailing interpolation (lag reduced significantly)
    rx += (mx - rx) * interpolationFactor;
    ry += (my - ry) * interpolationFactor;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(renderCursor);
  }

  // Start loop
  requestAnimationFrame(renderCursor);

  // Hover states
  const selectors = [
    'a', 'button', '.btn',
    '.skill-node', '.project-card',
    '.cert-card', '.stat-item',
    '.ach-card', '.contact-link',
    '.social-link', '.chip'
  ].join(', ');

  document.querySelectorAll(selectors).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
})();
