/* ==========================================
   理念ブランディング映像 LP - video.js
   ==========================================

   Features:
   - Loading screen animation
   - GSAP character-by-character text reveal
   - ScrollTrigger animations
   - Parallax effect
   - Smooth scroll

========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // Loading Screen Animation (Simplified)
  // ==========================================
  const loader = document.getElementById('loader');

  function hideLoader() {
    try {
      if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 800);
      }

      // Reveal header elements
      const logoImg = document.querySelector('.logo img');
      const menuBtn = document.querySelector('.menu-btn');
      if (logoImg) logoImg.style.opacity = '1';
      if (menuBtn) menuBtn.style.opacity = '1';

      // Start hero animations
      initHeroAnimations();
    } catch (e) {
      console.error('Loader error:', e);
      // Force hide loader on error
      if (loader) loader.style.display = 'none';
    }
  }

  // Hide loader after a short delay
  setTimeout(hideLoader, 1500);

  // ==========================================
  // Text Split Function - Character by Character
  // ==========================================
  function splitTextToChars(element) {
    const html = element.innerHTML;
    let result = '';
    let inTag = false;

    for (let i = 0; i < html.length; i++) {
      const char = html[i];

      if (char === '<') {
        inTag = true;
        result += char;
      } else if (char === '>') {
        inTag = false;
        result += char;
      } else if (inTag) {
        result += char;
      } else if (char === ' ' || char === '\u00A0') {
        result += '<span class="whitespace"> </span>';
      } else if (char === '\n' || char === '\r') {
        // Skip newlines
      } else {
        result += `<span class="char">${char}</span>`;
      }
    }

    element.innerHTML = result;
    return element.querySelectorAll('.char');
  }

  // ==========================================
  // Hero Animations (runs after loading)
  // ==========================================
  function initHeroAnimations() {
    try {
      // Hero Statement Animation
      const heroStatement = document.querySelector('.hero-statement');
      if (heroStatement) {
        heroStatement.style.transition = 'opacity 1.5s ease';
        heroStatement.style.opacity = '1';
      }

      // Hero Title Animation
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.style.transition = 'opacity 1.5s ease 0.5s';
        heroTitle.style.opacity = '1';
      }

      // Hero Subtitle Animation
      const heroSubtitle = document.querySelector('.hero-subtitle');
      if (heroSubtitle) {
        heroSubtitle.style.transition = 'opacity 1s ease 1s';
        heroSubtitle.style.opacity = '1';
      }

      // Scroll Indicator Animation
      const scrollIndicator = document.getElementById('scrollIndicator');
      if (scrollIndicator) {
        scrollIndicator.style.transition = 'opacity 1s ease 1.5s';
        scrollIndicator.style.opacity = '1';
      }
    } catch (e) {
      console.error('Hero animation error:', e);
    }
  }

  // ==========================================
  // Scroll Indicator Fade
  // ==========================================
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      opacity: 0,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '30% top',
        scrub: true
      }
    });
  }

  // ==========================================
  // Section Header Animations (Staggered Reveal)
  // ==========================================
  document.querySelectorAll('.section-header').forEach(header => {
    const label = header.querySelector('.section-label');
    const titleEn = header.querySelector('.section-title-en');
    const titleJa = header.querySelector('.section-title-ja');

    // Set initial states
    if (label) gsap.set(label, { opacity: 0, y: 20 });
    if (titleEn) gsap.set(titleEn, { opacity: 0, y: 30 });
    if (titleJa) gsap.set(titleJa, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: header,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        if (label) {
          tl.to(label, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
        if (titleEn) {
          tl.to(titleEn, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.3');
        }
        if (titleJa) {
          tl.to(titleJa, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.5');
        }
      }
    });
  });

  // ==========================================
  // Gallery Header Animation
  // ==========================================
  const galleryHeader = document.querySelector('.gallery-header');
  if (galleryHeader) {
    const label = galleryHeader.querySelector('.section-label');
    const titleEn = galleryHeader.querySelector('.section-title-en');
    const titleJa = galleryHeader.querySelector('.section-title-ja');

    if (label) gsap.set(label, { opacity: 0, y: 20 });
    if (titleEn) gsap.set(titleEn, { opacity: 0, y: 30 });
    if (titleJa) gsap.set(titleJa, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: galleryHeader,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        if (label) tl.to(label, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        if (titleEn) tl.to(titleEn, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');
        if (titleJa) tl.to(titleJa, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
      }
    });
  }

  // ==========================================
  // Scroll-Triggered Text Animations
  // ==========================================
  document.querySelectorAll('.section-title.js-text-reveal, .closing-statement.js-text-reveal, .philosophy-statement.js-text-reveal, .cta-statement.js-text-reveal').forEach(element => {
    // Split text into characters
    const chars = splitTextToChars(element);

    // Set initial state
    gsap.set(chars, {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)'
    });

    // Create scroll-triggered animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.04
        });
      }
    });
  });

  // ==========================================
  // Other Scroll Animations (fade, list, cta)
  // ==========================================
  // Section body fade animations
  document.querySelectorAll('[data-animate="fade"]').forEach(element => {
    gsap.set(element.querySelectorAll('p'), {
      y: 40,
      opacity: 0
    });

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(element.querySelectorAll('p'), {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2
        });
      }
    });
  });

  // List animations
  document.querySelectorAll('[data-animate="list"]').forEach(element => {
    const items = element.querySelectorAll('li');
    gsap.set(items, {
      x: -30,
      opacity: 0
    });

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1
        });
      }
    });
  });

  // Single fade animation
  document.querySelectorAll('[data-animate="fade-single"]').forEach(element => {
    gsap.set(element, {
      y: 30,
      opacity: 0
    });

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        });
      }
    });
  });

  // CTA button animation
  document.querySelectorAll('[data-animate="cta"]').forEach(element => {
    gsap.set(element, {
      y: 30,
      opacity: 0
    });

    ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3
        });
      }
    });
  });

  // ==========================================
  // Flow Item Animations
  // ==========================================
  document.querySelectorAll('[data-animate="flow-item"]').forEach((item, index) => {
    gsap.set(item, {
      opacity: 0,
      y: 50
    });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15
        });
      }
    });
  });

  // ==========================================
  // Menu Toggle with GSAP Animation
  // ==========================================
  const menuBtn = document.getElementById('menuBtn');
  const fullscreenMenu = document.getElementById('fullscreenMenu');
  const menuItems = document.querySelectorAll('.menu-nav li');
  const menuContact = document.querySelector('.menu-contact');
  let isMenuOpen = false;

  // メニューを開くアニメーション
  function openMenu() {
    isMenuOpen = true;
    menuBtn.classList.add('active');
    fullscreenMenu.classList.add('active');
    document.body.style.overflow = 'hidden';

    // メニュー項目のスタガーアニメーション
    gsap.fromTo(menuItems,
      {
        x: -80,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.3
      }
    );

    // コンタクトボタンのアニメーション
    if (menuContact) {
      gsap.fromTo(menuContact,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      );
    }
  }

  // メニューを閉じるアニメーション
  function closeMenu() {
    isMenuOpen = false;

    // メニュー項目を素早く消す
    gsap.to(menuItems, {
      x: -40,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      stagger: 0.03
    });

    // コンタクトボタンを消す
    if (menuContact) {
      gsap.to(menuContact, { opacity: 0, duration: 0.3 });
    }

    // アニメーション完了後にクラスを削除
    setTimeout(() => {
      menuBtn.classList.remove('active');
      fullscreenMenu.classList.remove('active');
      document.body.style.overflow = '';
    }, 400);
  }

  if (menuBtn && fullscreenMenu) {
    menuBtn.addEventListener('click', () => {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu on link click
    const menuLinks = fullscreenMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) {
          closeMenu();
        }
      });
    });
  }

  // ==========================================
  // Parallax Effect (Enhanced with GSAP ScrollTrigger)
  // ==========================================
  // Background parallax for sections with .parallax-bg
  document.querySelectorAll('.parallax-bg').forEach(bg => {
    gsap.to(bg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: bg.closest('.parallax-container') || bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  // Legacy parallax for .parallax-image elements
  const parallaxImages = document.querySelectorAll('.parallax-image');

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.pageYOffset;

    parallaxImages.forEach(img => {
      const speed = parseFloat(img.dataset.speed) || 0.05;
      const yPos = scrollY * speed;
      img.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // ==========================================
  // Header on Scroll
  // ==========================================
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // Scroll Progress Bar
  // ==========================================
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });
  }

  // ==========================================
  // Custom Cursor
  // ==========================================
  const cursor = document.getElementById('cursor');

  if (cursor && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
    });

    // ホバー対象要素
    const hoverTargets = document.querySelectorAll('a, button, .cta-link');

    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      target.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ==========================================
  // Page Transition
  // ==========================================
  document.querySelectorAll('a[href^="index"], a[href^="recruitment"], a[href^="medical"], a[href^="knowledge"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      document.body.classList.add('page-out');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
});
