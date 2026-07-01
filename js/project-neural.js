/**
 * project-neural.js
 * Renders a lightweight neural network particle animation on each
 * .project-neural-canvas element inside project cards.
 *
 * The canvas fades in on card hover (via CSS) and runs a small
 * network of nodes + connections in the card's accent color.
 *
 * Two accent palettes are supported via data-color attribute:
 *   data-color="cyan"   → uses cyber cyan
 *   data-color="purple" → uses amethyst purple
 */

(function () {
  'use strict';

  /* ---- Config ---- */
  const CONFIGS = {
    cyan: {
      node:   'rgba(0, 212, 255, ',
      line:   'rgba(0, 212, 255, ',
      glow:   'rgba(0, 212, 255, 0.08)',
    },
    purple: {
      node:   'rgba(139, 92, 246, ',
      line:   'rgba(139, 92, 246, ',
      glow:   'rgba(139, 92, 246, 0.08)',
    },
  };

  const NODE_COUNT = 28;
  const MAX_DIST   = 90;

  /* ---- Per-canvas state ---- */
  const instances = [];

  class NeuralOverlay {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx    = canvas.getContext('2d');
      this.color  = CONFIGS[canvas.dataset.color] || CONFIGS.cyan;
      this.nodes  = [];
      this.running= false;
      this.raf    = null;

      this._resize();
      this._initNodes();
      this._bindCard();
    }

    _resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.W = this.canvas.width  = rect.width  || 400;
      this.H = this.canvas.height = rect.height || 200;
    }

    _initNodes() {
      this.nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        this.nodes.push({
          x:  Math.random() * this.W,
          y:  Math.random() * this.H,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r:  Math.random() * 1.5 + 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.01,
        });
      }
    }

    _bindCard() {
      const card = this.canvas.closest('.project-card');
      if (!card) return;

      card.addEventListener('mouseenter', () => this.start());
      card.addEventListener('mouseleave', () => this.stop());
    }

    start() {
      if (this.running) return;
      this.running = true;
      this._loop();
    }

    stop() {
      this.running = false;
      if (this.raf) cancelAnimationFrame(this.raf);
      this.ctx.clearRect(0, 0, this.W, this.H);
    }

    _loop() {
      if (!this.running) return;
      this.raf = requestAnimationFrame(() => this._loop());
      this._draw();
    }

    _draw() {
      const { ctx, W, H, nodes, color } = this;
      ctx.clearRect(0, 0, W, H);

      /* Update + draw nodes */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += n.pulseSpeed;

        const alpha = (Math.sin(n.pulse) * 0.25 + 0.6);

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (Math.sin(n.pulse) * 0.3 + 0.9), 0, Math.PI * 2);
        ctx.fillStyle = color.node + alpha + ')';
        ctx.fill();

        /* Connect nearby nodes */
        for (let j = i + 1; j < nodes.length; j++) {
          const m  = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d  = Math.sqrt(dx * dx + dy * dy);

          if (d < MAX_DIST) {
            const lineAlpha = (1 - d / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = color.line + lineAlpha + ')';
            ctx.lineWidth   = (1 - d / MAX_DIST) * 1.0;
            ctx.stroke();
          }
        }
      }
    }
  }

  /* ---- Init all canvases ---- */
  function init() {
    document.querySelectorAll('.project-neural-canvas').forEach((canvas) => {
      instances.push(new NeuralOverlay(canvas));
    });
  }

  /* Wait for DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
