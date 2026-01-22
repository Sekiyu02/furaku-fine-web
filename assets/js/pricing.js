/**
 * Pricing Page JavaScript
 * 料金プランページ用スクリプト
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
    const interactiveElements = document.querySelectorAll('a, button');
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

  // ========== Card Animation on Scroll ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});
