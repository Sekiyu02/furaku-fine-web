/**
 * Contact Page JavaScript
 * お問い合わせページ用スクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========== Custom Cursor ==========
  const cursor = document.getElementById('customCursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener('mouseenter', () => {
      cursor.classList.add('visible');
    });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('visible');
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, label');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ========== Menu Toggle ==========
  const menuBtn = document.getElementById('menuBtn');
  const fullscreenMenu = document.getElementById('fullscreenMenu');

  if (menuBtn && fullscreenMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      fullscreenMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu on link click
    const menuLinks = fullscreenMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && fullscreenMenu.classList.contains('active')) {
        menuBtn.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ========== Form Handling ==========
  const contactForm = document.getElementById('contactForm');
  const contactThanks = document.getElementById('contactThanks');
  const formSection = document.querySelector('.contact-form-section');
  const heroSection = document.querySelector('.contact-hero');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.contact-submit-btn');
      const originalText = submitBtn.innerHTML;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
            <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
        送信中...
      `;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Hide form and hero, show thanks
          if (formSection) formSection.style.display = 'none';
          if (heroSection) heroSection.style.display = 'none';
          if (contactThanks) contactThanks.style.display = 'flex';

          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });

          // Track conversion (if GA4 is available)
          if (typeof gtag === 'function') {
            gtag('event', 'form_submit', {
              'event_category': 'Contact',
              'event_label': formData.get('inquiry_type')
            });
          }
        } else {
          throw new Error('送信に失敗しました');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('送信に失敗しました。お手数ですが、直接メールにてお問い合わせください。');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // ========== Form Validation Enhancement ==========
  const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#e74c3c';
      } else {
        input.style.borderColor = '';
      }
    });

    input.addEventListener('input', () => {
      if (input.style.borderColor === 'rgb(231, 76, 60)') {
        input.style.borderColor = '';
      }
    });
  });

  // ========== Check URL Parameters for Success State ==========
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    if (formSection) formSection.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (contactThanks) contactThanks.style.display = 'flex';
  }
});
