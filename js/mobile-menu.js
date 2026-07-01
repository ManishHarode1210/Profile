/**
 * mobile-menu.js
 * Handles the hamburger menu open / close on small viewports.
 * Exports closeMobileMenu to global scope for inline onclick usage.
 */

(function () {
  'use strict';

  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu');
  if (!hamburger || !mobileMenu || !closeMenuBtn) return;

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMobileMenu);
  closeMenuBtn.addEventListener('click', closeMobileMenu);

  /* Close on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* Expose globally for inline onclick attributes in HTML */
  window.closeMobileMenu = closeMobileMenu;
})();
