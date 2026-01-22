    // ========== Mobile Detection & Performance ==========
    const isMobile = window.innerWidth <= 900;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Set --vh variable for mobile viewport height
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);

    // Loading Screen
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        startHeroAnimations();
      }, 2500);
    });

    // フォールバック：4秒後に強制的にローディングを非表示
    setTimeout(() => {
      const loading = document.getElementById('loading');
      if (loading && !loading.classList.contains('hidden')) {
        loading.classList.add('hidden');
        if (typeof startHeroAnimations === 'function') startHeroAnimations();
      }
    }, 4000);

    // Fullscreen Menu
    const menuBtn = document.getElementById('menuBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const menuLinks = document.querySelectorAll('.menu-nav a, .menu-contact a');

    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      fullscreenMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Hero Animations
    function startHeroAnimations() {
      const elements = ['.hero-icon', '.hero-label', '.hero-title', '.hero-subtitle', '.hero-cta', '.hero-scroll'];
      elements.forEach((sel, i) => {
        setTimeout(() => {
          const el = document.querySelector(sel);
          if (el) {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        }, i * 150);
      });
    }

    // Hero Slideshow
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);

    // Header Scroll Effect (Optimized with RAF throttling)
    const header = document.getElementById('header');
    let lastScrollY = 0;
    let headerTicking = false;

    function updateHeader() {
      if (lastScrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      headerTicking = false;
    }

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      if (!headerTicking) {
        requestAnimationFrame(updateHeader);
        headerTicking = true;
      }
    }, { passive: true });

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });

    // ========== Custom Cursor (Optimized) - PC Only ==========
    (function() {
      // Skip on mobile/touch devices
      if (isTouchDevice || isMobile) return;

      const cursor = document.getElementById('customCursor');
      if (!cursor) return;

      let cursorX = 0, cursorY = 0;
      let currentX = 0, currentY = 0;
      let isFirstMove = true;
      let cursorAnimating = false;

      function animateCursor() {
        const ease = 0.15;
        const dx = cursorX - currentX;
        const dy = cursorY - currentY;

        // Stop animation when cursor is close enough to target
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          currentX = cursorX;
          currentY = cursorY;
          cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          cursorAnimating = false;
          return;
        }

        currentX += dx * ease;
        currentY += dy * ease;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        requestAnimationFrame(animateCursor);
      }

      document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        if (isFirstMove) {
          currentX = cursorX;
          currentY = cursorY;
          cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          cursor.classList.add('visible');
          isFirstMove = false;
        }

        // Start animation if not already running
        if (!cursorAnimating) {
          cursorAnimating = true;
          requestAnimationFrame(animateCursor);
        }
      }, { passive: true });

      document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
        isFirstMove = true;
        cursorAnimating = false;
      });

      document.addEventListener('mouseenter', () => {
        if (!isFirstMove) cursor.classList.add('visible');
      });

      // Hover effect on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .menu-btn, input, textarea, [role="button"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });

      // Click effect
      document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
      document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

      console.log('Custom cursor initialized successfully');
    })();
    // Smooth scroll for anchor links (native)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    // ========== 1. Magnetic Button Effect - PC Only ==========
    if (!isTouchDevice && !isMobile) {
      const magneticButtons = document.querySelectorAll('.magnetic-wrap');
      magneticButtons.forEach((wrap) => {
        const area = wrap.querySelector('.magnetic-area');
        if(!area) return;
        wrap.addEventListener('mousemove', (e) => {
          const rect = wrap.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          area.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        wrap.addEventListener('mouseleave', () => {
          area.style.transform = 'translate(0, 0)';
        });
      });
    }

    // ========== 2. Dynamic Footer Height ==========
    function setFooterHeight() {
      const footer = document.querySelector('footer');
      const main = document.getElementById('mainContent');
      if (footer && main && window.innerWidth > 900) {
        const h = footer.offsetHeight;
        main.style.marginBottom = `${h}px`;
      } else if (main) {
        main.style.marginBottom = '0px';
      }
    }
    window.addEventListener('resize', setFooterHeight);
    window.addEventListener('load', () => setTimeout(setFooterHeight, 100));

    // ========== 3. Flow Timeline Animation (Scroll Linked) ==========
    const timeline = document.querySelector('.flow-timeline');
    function updateTimeline() {
      if (!timeline) return;
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.8; // 画面の80%の位置に来たら開始

      // 画面内での進行度を計算
      let progress = (start - rect.top) / (rect.height);

      // 0% 〜 100% に制限
      progress = Math.max(0, Math.min(1, progress));

      // CSS変数を更新
      timeline.style.setProperty('--line-height', `${progress * 100}%`);
    }

    // Lenisのスクロールループに追加
    requestAnimationFrame(function loop() {
      updateTimeline();
      requestAnimationFrame(loop);
    });
