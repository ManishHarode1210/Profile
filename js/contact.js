/**
 * contact.js — v2
 * Updated to target new form submit button ID: #form-submit
 * and form ID: #contact-form.
 */
(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const btn  = document.getElementById('form-submit');
  if (!form || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const span = btn.querySelector('span');
    btn.disabled     = true;
    span.textContent = 'Sending…';
    btn.style.opacity = '0.75';

    setTimeout(() => {
      span.textContent   = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22d3a5, #16a34a)';
      btn.style.opacity    = '1';

      setTimeout(() => {
        span.textContent   = 'Send Message ↗';
        btn.disabled         = false;
        btn.style.background = '';
        btn.style.opacity    = '';
        form.reset();
      }, 3000);
    }, 1500);
  });
})();
