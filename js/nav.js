/**
 * nav.js — v2 (HUD Telemetry Edition)
 * Handles navbar glass scroll effect, top scroll progress bar,
 * and live system telemetry HUD indicators (Ping, Coordinates, UTC Clock).
 */
(function () {
  'use strict';

  const nav      = document.getElementById('navbar');
  const progress = document.getElementById('scroll-progress');
  if (!nav || !progress) return;

  // Glass backdrop & progress bar updates
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    progress.style.width = pct + '%';
  }, { passive: true });

  // Navigation HUD Telemetry Update
  const pingEl = document.getElementById('hud-ping');
  const timeEl = document.getElementById('hud-time');

  // UTC clock update
  if (timeEl) {
    setInterval(() => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      timeEl.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  // Latency ping simulation
  if (pingEl) {
    setInterval(() => {
      // Simulate typical network latency fluctuation (11ms - 19ms)
      const mockPing = Math.floor(Math.random() * 9) + 11;
      pingEl.textContent = mockPing;
    }, 2500);
  }
})();
