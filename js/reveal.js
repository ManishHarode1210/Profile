/**
 * reveal.js — v2
 * IntersectionObserver scroll-reveal for .reveal elements.
 * Supports directional variants: .from-left and .from-right.
 * Uses new delay-N classes (delay-1 … delay-6).
 */
(function () {
  'use strict';

  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
})();
