/**
 * neural.js
 * Animated neural network particle canvas for the portfolio background.
 * Draws interconnected glowing particles that respond to mouse movement.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let W, H;
  const mouse         = { x: -9999, y: -9999 };
  const PARTICLE_COUNT = 120;
  const MAX_DIST       = 140;
  const particles      = [];

  /* ---- Resize ---- */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ---- Particle Class ---- */
  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x          = Math.random() * W;
      this.y          = Math.random() * H;
      this.vx         = (Math.random() - 0.5) * 0.4;
      this.vy         = (Math.random() - 0.5) * 0.4;
      this.r          = Math.random() * 1.8 + 0.6;
      this.alpha      = Math.random() * 0.5 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseOffset= Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      /* Bounce off edges */
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;

      /* Mouse repulsion */
      const dx   = this.x - mouse.x;
      const dy   = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.8;
        this.vx += (dx / dist) * force * 0.05;
        this.vy += (dy / dist) * force * 0.05;
      }

      /* Speed cap */
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 1.5) {
        this.vx = (this.vx / speed) * 1.5;
        this.vy = (this.vy / speed) * 1.5;
      }
    }

    draw(t) {
      const pulse = Math.sin(t * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.alpha * pulse})`;
      ctx.fill();
    }
  }

  /* ---- Init ---- */
  function init() {
    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  }

  /* ---- Render Loop ---- */
  let t = 0;

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    t++;

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(t);

      /* Draw connections between nearby particles */
      for (let j = i + 1; j < particles.length; j++) {
        const dx    = particles[i].x - particles[j].x;
        const dy    = particles[i].y - particles[j].y;
        const d     = Math.sqrt(dx * dx + dy * dy);

        if (d < MAX_DIST) {
          const alpha    = (1 - d / MAX_DIST) * 0.25;
          const gradient = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          gradient.addColorStop(0,   `rgba(0, 212, 255, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.8})`);
          gradient.addColorStop(1,   `rgba(0, 212, 255, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth   = (1 - d / MAX_DIST) * 1.2;
          ctx.stroke();
        }
      }
    }
  }

  /* ---- Events ---- */
  window.addEventListener('resize',     resize,    { passive: true });
  window.addEventListener('mousemove',  (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', ()  => { mouse.x = -9999;     mouse.y = -9999; });

  init();
  animate();
})();
