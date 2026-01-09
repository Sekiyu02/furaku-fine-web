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
  // Loading Screen
  // ==========================================
  const loading = document.getElementById('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.classList.add('fade-out');
      // Start hero animations after loading
      setTimeout(() => {
        initHeroAnimations();
      }, 500);
    }, 2000);
  });

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
  // 水面から浮かび上がる光のイメージ
  // ==========================================
  function initHeroAnimations() {
    // Hero Statement Animation - 水面から浮かび上がる光
    const heroStatement = document.querySelector('.hero-statement.js-text-reveal');
    if (heroStatement) {
      const chars = splitTextToChars(heroStatement);
      // 初期状態：ぼかし + 明るさで光が浮かび上がる表現
      gsap.set(chars, {
        opacity: 0,
        filter: 'blur(20px) brightness(2)',
        scale: 1.02,
        y: 5
      });
      // アニメーション
      gsap.to(chars, {
        opacity: 1,
        filter: 'blur(0px) brightness(1)',
        scale: 1,
        y: 0,
        duration: 1.8,
        ease: 'power2.out',
        stagger: 0.05
      });
    }

    // Hero Title Animation - 光の中から同時にぶわっと浮かび上がる
    const heroTitle = document.querySelector('.hero-title.js-text-reveal');
    if (heroTitle) {
      const chars = splitTextToChars(heroTitle);
      // 初期状態：強い発光感（白く光る）
      gsap.set(chars, {
        opacity: 0,
        filter: 'blur(40px) brightness(3)',
        scale: 1.08,
        color: '#ffffff',
        textShadow: '0 0 60px rgba(255,255,255,0.8), 0 0 120px rgba(212,128,74,0.6)'
      });
      // アニメーション：全文字同時に浮かび上がる
      gsap.to(chars, {
        opacity: 1,
        filter: 'blur(0px) brightness(1)',
        scale: 1,
        color: '#f5f0eb',
        textShadow: '0 0 0px rgba(255,255,255,0)',
        duration: 2.5,
        ease: 'power2.out',
        delay: 0.8
      });
    }
  }

  // ==========================================
  // Scroll-Triggered Text Animations
  // ==========================================
  document.querySelectorAll('.section-title.js-text-reveal, .closing-statement.js-text-reveal').forEach(element => {
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
  // Parallax Effect
  // ==========================================
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
