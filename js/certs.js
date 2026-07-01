/**
 * certs.js — v1 (Interactive Certifications Controller)
 * Manages certificate filtering, high-tech spotlight mouse glow,
 * and the futuristic glassmorphic diagnostic modal viewer.
 */
(function () {
  'use strict';

  // 1. Filtering Logic
  const filterButtons = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
          card.style.display = 'block';
          // Trigger browser layout reflow to enable transition
          void card.offsetWidth;
          card.classList.remove('hidden-anim');
        } else {
          card.classList.add('hidden-anim');
          card.classList.add('filtered-out');
          // Wait for transition to complete before setting display none
          setTimeout(() => {
            if (card.classList.contains('filtered-out')) {
              card.style.display = 'none';
            }
          }, 400); // Matches CSS transition duration
        }
      });
    });
  });

  // 2. Interactive Spotlight Mouse Glow Effect
  certCards.forEach(card => {
    const fronts = card.querySelectorAll('.cert-front');
    const backs = card.querySelectorAll('.cert-back');
    
    const updateGlow = (e, element) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
    };

    fronts.forEach(front => {
      front.addEventListener('mousemove', (e) => updateGlow(e, front));
    });

    backs.forEach(back => {
      back.addEventListener('mousemove', (e) => updateGlow(e, back));
    });
  });

  // 3. Technical Modal Dialog Logic
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const modalClose = document.getElementById('cert-modal-close');
  const modalOverlay = document.getElementById('cert-modal-overlay');

  const openModal = (data) => {
    // Set dynamic texts
    document.getElementById('modal-cert-title').innerText = data.title;
    document.getElementById('modal-cert-issuer').innerText = data.issuer;
    document.getElementById('modal-cert-id').innerText = data.id;
    document.getElementById('modal-cert-date').innerText = data.date;
    document.getElementById('modal-cert-verify-link').href = data.url;

    // Set interactive mockup data
    document.getElementById('mockup-cert-title').innerText = data.title;
    document.getElementById('mockup-cert-issuer').innerText = data.issuer;
    document.getElementById('mockup-cert-id').innerText = data.id;
    document.getElementById('mockup-cert-date').innerText = data.date;

    // Copy logo SVG
    const modalLogoContainer = document.getElementById('modal-cert-logo-container');
    const sourceCard = document.querySelector(`.cert-card[data-id="${data.id}"]`);
    if (modalLogoContainer && sourceCard) {
      const sourceSvg = sourceCard.querySelector('.cert-logo-svg');
      if (sourceSvg) {
        modalLogoContainer.innerHTML = sourceSvg.outerHTML;
      }
    }

    // Populate skills verification tags
    const skillsContainer = document.getElementById('modal-cert-skills');
    if (skillsContainer) {
      skillsContainer.innerHTML = '';
      if (data.skills) {
        data.skills.split(',').forEach(skill => {
          const span = document.createElement('span');
          span.className = 'modal-skill-tag';
          span.innerText = skill.trim();
          skillsContainer.appendChild(span);
        });
      }
    }

    // Trigger decoding effect on the modal elements
    const decryptTitle = document.getElementById('modal-cert-title');
    const originalText = decryptTitle.innerText;
    decodeEffect(originalText, decryptTitle);

    // Open transitions
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Decode scanner effect
  function decodeEffect(text, targetElement) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()';
    let iterations = 0;
    const interval = setInterval(() => {
      targetElement.innerHTML = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1;
    }, 15);
  }

  // Bind Open Buttons
  const viewButtons = document.querySelectorAll('.cert-view-btn');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.cert-card');
      if (!card) return;

      const title = card.querySelector('.cert-title').innerText;
      const issuer = card.querySelector('.cert-issuer').innerText;
      const id = card.getAttribute('data-id');
      const date = card.getAttribute('data-issue');
      const url = card.getAttribute('data-url');
      const skills = card.getAttribute('data-skills');

      openModal({ title, issuer, id, date, url, skills });
    });
  });

  // Modal event binders
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Close modal on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

})();
