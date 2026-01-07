'use strict';

/**
 * FURAKU Common JavaScript
 * Shared functionality across all pages
 */

// ========== Global Variables ==========
const isMobile = window.innerWidth <= 900;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Export to window for page-specific scripts
window.FurakuCommon = {
  isMobile: isMobile,
  isTouchDevice: isTouchDevice
};

// ========== Viewport Height Fix for Mobile ==========
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH);

// ========== DOMContentLoaded ==========
document.addEventListener('DOMContentLoaded', function() {

  // ========== Loading Screen ==========
  function initLoadingScreen(delay, fallbackDelay, callback) {
    const loading = document.getElementById('loading');
    if (!loading) return;

    const defaultDelay = delay || 2500;
    const defaultFallback = fallbackDelay || 4000;

    window.addEventListener('load', function() {
      setTimeout(function() {
        loading.classList.add('hidden');
        if (typeof callback === 'function') callback();
      }, defaultDelay);
    });

    // Fallback: force hide loading screen
    setTimeout(function() {
      if (loading && !loading.classList.contains('hidden')) {
        loading.classList.add('hidden');
        if (typeof callback === 'function') callback();
      }
    }, defaultFallback);
  }

  // Auto-init loading screen
  initLoadingScreen();

  // Export for custom use
  window.FurakuCommon.initLoadingScreen = initLoadingScreen;

  // ========== Fullscreen Menu ==========
  function initFullscreenMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    if (!menuBtn || !fullscreenMenu) return;

    const menuLinks = document.querySelectorAll('.menu-nav a, .menu-contact a');

    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('active');
      fullscreenMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuBtn.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
  initFullscreenMenu();

  // ========== Header Scroll Effect ==========
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    var lastScrollY = 0;
    var headerTicking = false;

    function updateHeader() {
      if (lastScrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      headerTicking = false;
    }

    window.addEventListener('scroll', function() {
      lastScrollY = window.scrollY;
      if (!headerTicking) {
        requestAnimationFrame(updateHeader);
        headerTicking = true;
      }
    }, { passive: true });
  }
  initHeaderScroll();

  // ========== Scroll Reveal Animations ==========
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scroll-animate');
    if (revealElements.length === 0) return;

    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }
  initScrollReveal();

  // ========== Custom Cursor ==========
  function initCustomCursor() {
    if (isTouchDevice || isMobile) return;

    var cursor = document.getElementById('customCursor');
    if (!cursor) return;

    var cursorX = 0, cursorY = 0;
    var currentX = 0, currentY = 0;
    var isFirstMove = true;
    var cursorAnimating = false;

    function animateCursor() {
      var ease = 0.15;
      var dx = cursorX - currentX;
      var dy = cursorY - currentY;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        currentX = cursorX;
        currentY = cursorY;
        cursor.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
        cursorAnimating = false;
        return;
      }

      currentX += dx * ease;
      currentY += dy * ease;
      cursor.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
      requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', function(e) {
      cursorX = e.clientX;
      cursorY = e.clientY;

      if (isFirstMove) {
        currentX = cursorX;
        currentY = cursorY;
        cursor.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
        cursor.classList.add('visible');
        isFirstMove = false;
      }

      if (!cursorAnimating) {
        cursorAnimating = true;
        requestAnimationFrame(animateCursor);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function() {
      cursor.classList.remove('visible');
      isFirstMove = true;
      cursorAnimating = false;
    });

    document.addEventListener('mouseenter', function() {
      if (!isFirstMove) cursor.classList.add('visible');
    });

    // Hover effect on interactive elements
    var interactiveElements = document.querySelectorAll('a, button, .menu-btn, input, textarea, [role="button"]');
    interactiveElements.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', function() {
        cursor.classList.remove('hover');
      });
    });

    // Click effect
    document.addEventListener('mousedown', function() {
      cursor.classList.add('clicking');
    });
    document.addEventListener('mouseup', function() {
      cursor.classList.remove('clicking');
    });
  }
  initCustomCursor();

  // ========== Smooth Scroll for Anchor Links ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  initSmoothScroll();

  // ========== Text Stagger Animation ==========
  function initTextStagger() {
    var staggerElements = document.querySelectorAll('.stagger-text');
    if (staggerElements.length === 0) return;

    staggerElements.forEach(function(el) {
      var keepHtml = el.hasAttribute('data-stagger-keep-html');

      if (keepHtml) {
        processNodeForStagger(el);
      } else {
        var text = el.textContent;
        el.innerHTML = '';

        text.split('').forEach(function(char, index) {
          var span = document.createElement('span');
          span.className = char === ' ' ? 'char space' : 'char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.transitionDelay = (index * 0.03) + 's';
          el.appendChild(span);
        });
      }
    });

    function processNodeForStagger(element) {
      var walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      var textNodes = [];
      var node;
      while (node = walker.nextNode()) {
        if (node.textContent.trim()) {
          textNodes.push(node);
        }
      }

      var charIndex = 0;
      textNodes.forEach(function(textNode) {
        var text = textNode.textContent;
        var fragment = document.createDocumentFragment();

        text.split('').forEach(function(char) {
          if (char === '\n' || char === '\r') return;

          var span = document.createElement('span');
          span.className = char === ' ' ? 'char space' : 'char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.transitionDelay = (charIndex * 0.03) + 's';
          fragment.appendChild(span);
          charIndex++;
        });

        textNode.parentNode.replaceChild(fragment, textNode);
      });
    }

    var staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    staggerElements.forEach(function(el) {
      staggerObserver.observe(el);
    });
  }
  initTextStagger();

  // ========== Magnetic Button Effect ==========
  function initMagneticButtons() {
    var magneticButtons = document.querySelectorAll('.magnetic-wrap');
    if (magneticButtons.length === 0) return;

    magneticButtons.forEach(function(wrap) {
      var area = wrap.querySelector('.magnetic-area');
      if (!area) return;

      wrap.addEventListener('mousemove', function(e) {
        var rect = wrap.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        area.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
      });

      wrap.addEventListener('mouseleave', function() {
        area.style.transform = 'translate(0, 0)';
      });
    });
  }
  initMagneticButtons();

  // ========== Dynamic Footer Height for Sticky Footer ==========
  function initFooterHeight() {
    function setFooterHeight() {
      var footer = document.querySelector('footer');
      var main = document.getElementById('mainContent');
      if (footer && main && window.innerWidth > 900) {
        var h = footer.offsetHeight;
        main.style.marginBottom = h + 'px';
      } else if (main) {
        main.style.marginBottom = '0px';
      }
    }

    window.addEventListener('resize', setFooterHeight);
    window.addEventListener('load', function() {
      setTimeout(setFooterHeight, 100);
    });

    setFooterHeight();
  }
  initFooterHeight();

  // ========== Parallax Effect (PC Only) ==========
  function initParallax() {
    if (isMobile || isTouchDevice) return;

    var parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length === 0) return;

    var parallaxTicking = false;

    function updateParallaxElements() {
      var windowCenterY = window.innerHeight / 2;
      parallaxElements.forEach(function(el) {
        var speed = parseFloat(el.dataset.speed) || 0.1;
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
          var centerY = rect.top + rect.height / 2;
          var offset = (centerY - windowCenterY) * speed;
          el.style.transform = 'translate(-50%, calc(-50% + ' + offset + 'px))';
        }
      });
      parallaxTicking = false;
    }

    window.addEventListener('scroll', function() {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallaxElements);
        parallaxTicking = true;
      }
    }, { passive: true });
  }
  initParallax();

  // ========== Inner Image Parallax (PC Only) ==========
  function initImageParallax() {
    if (isMobile || isTouchDevice) return;

    var parallaxImages = document.querySelectorAll('.parallax-img');
    if (parallaxImages.length === 0) return;

    var imgParallaxTicking = false;

    function updateImageParallax() {
      var windowHeight = window.innerHeight;
      parallaxImages.forEach(function(img) {
        var wrap = img.closest('.parallax-img-wrap');
        if (!wrap) return;
        var rect = wrap.getBoundingClientRect();

        if (rect.top < windowHeight && rect.bottom > 0) {
          var progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          var move = -10 + (progress * 20);
          img.style.transform = 'translateY(' + move + '%) scale(1.1)';
        }
      });
      imgParallaxTicking = false;
    }

    window.addEventListener('scroll', function() {
      if (!imgParallaxTicking) {
        requestAnimationFrame(updateImageParallax);
        imgParallaxTicking = true;
      }
    }, { passive: true });

    updateImageParallax();
  }
  initImageParallax();

  console.log('FURAKU Common JS initialized');
});

// Export utilities
window.FurakuCommon.setVH = setVH;
