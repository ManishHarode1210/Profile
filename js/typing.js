/**
 * typing.js
 * Terminal-style typewriter animation for the hero section.
 * Cycles through a list of role phrases with smooth type / delete rhythm.
 */

(function () {
  'use strict';

  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'AI Developer',
    'AI Engineer',
    'Full Stack Developer',
    'ML Enthusiast',
    'Building Intelligent Systems'
  ];

  const SPEED_TYPE   = 80;   /* ms per character while typing  */
  const SPEED_DELETE = 40;   /* ms per character while deleting */
  const PAUSE_END    = 1800; /* ms pause at end of phrase       */
  const PAUSE_START  = 300;  /* ms pause after full deletion    */

  let phraseIndex  = 0;
  let charIndex    = 0;
  let isDeleting   = false;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      /* Type forward */
      el.textContent = currentPhrase.slice(0, ++charIndex);

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
    } else {
      /* Delete backward */
      el.textContent = currentPhrase.slice(0, --charIndex);

      if (charIndex === 0) {
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
    }

    setTimeout(tick, isDeleting ? SPEED_DELETE : SPEED_TYPE);
  }

  /* Small initial delay so the page loads before typing starts */
  setTimeout(tick, 1200);
})();
