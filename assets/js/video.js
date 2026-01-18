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
  // Enhanced Loading Screen Animation
  // ==========================================
  const loader = document.getElementById('loader');
  const loaderLogo = document.querySelector('.loader-logo img');
  const loaderTextSpans = document.querySelectorAll('.loader-text span');
  const loaderProgressBar = document.querySelector('.loader-progress-bar');

  function startLoaderAnimation() {
    const loaderTl = gsap.timeline();

    loaderTl
      .to(loaderLogo, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      })
      .to(loaderTextSpans, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.5')
      .to(loaderProgressBar, {
        width: '100%',
        duration: 1.5,
        ease: 'power1.inOut'
      }, '-=0.3')
      .to(loader, {
        yPercent: -100,
        duration: 1,
        ease: 'power3.inOut'
      }, '+=0.3')
      .add(() => {
        loader.style.display = 'none';
      })
      .add(() => {
        gsap.to('.logo img, .menu-btn', {
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        });
      })
      .add(() => {
        initHeroAnimations();
        // ローダー完了後にスクロールアニメーションを初期化
        initScrollAnimations();
      }, '+=0.2');
  }

  window.addEventListener('load', startLoaderAnimation);

  setTimeout(() => {
    if (loader && loader.style.display !== 'none') {
      startLoaderAnimation();
    }
  }, 2000);

  // ==========================================
  // Hero Animations (runs after loading)
  // ==========================================
  function initHeroAnimations() {
    const heroStatement = document.querySelector('.hero-statement.js-text-reveal');
    if (heroStatement) {
      heroStatement.style.visibility = 'visible';
      heroStatement.style.opacity = '1';

      gsap.fromTo(heroStatement,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      );
    }

    const heroTitle = document.querySelector('.hero-title.js-text-reveal');
    if (heroTitle) {
      heroTitle.style.visibility = 'visible';
      heroTitle.style.opacity = '1';

      gsap.fromTo(heroTitle,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      gsap.to(heroSubtitle, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8
      });
    }

    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power2.out',
        delay: 1.5
      });
    }
  }

  // ==========================================
  // Scroll Animations (initialized after loader)
  // ==========================================
  function initScrollAnimations() {
    // 現在のスクロール位置を取得
    const currentScroll = window.pageYOffset;

    // Scroll Indicator Fade
    const scrollIndicatorFade = document.getElementById('scrollIndicator');
    if (scrollIndicatorFade) {
      gsap.to(scrollIndicatorFade, {
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '30% top',
          scrub: true
        }
      });
    }

    // Hero Section Fade Out on Scroll
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero');

    if (heroContent && heroSection) {
      gsap.to(heroContent, {
        opacity: 0,
        y: -100,
        filter: 'blur(10px)',
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '80% top',
          scrub: 1
        }
      });
    }

    // Hero背景のパララックス
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && heroSection) {
      gsap.to(heroBg, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // ==========================================
    // Section Header Animations
    // ==========================================
    document.querySelectorAll('.section-header').forEach(header => {
      const label = header.querySelector('.section-label');
      const title = header.querySelector('.section-title-en');
      const elements = [label, title].filter(Boolean);

      // 初期状態を設定
      gsap.set(elements, { opacity: 0, y: 40 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // Gallery Header Animation
    const galleryHeader = document.querySelector('.gallery-header');
    if (galleryHeader) {
      const label = galleryHeader.querySelector('.section-label');
      const title = galleryHeader.querySelector('.section-title-en');
      const elements = [label, title].filter(Boolean);

      gsap.set(elements, { opacity: 0, y: 40 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: galleryHeader,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse'
        }
      });
    }

    // ==========================================
    // Section Body Fade Animations
    // ==========================================
    document.querySelectorAll('[data-animate="fade"]').forEach(element => {
      const paragraphs = element.querySelectorAll('p');

      gsap.set(paragraphs, { y: 40, opacity: 0 });

      gsap.to(paragraphs, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // ==========================================
    // List Animations
    // ==========================================
    document.querySelectorAll('[data-animate="list"]').forEach(element => {
      const items = element.querySelectorAll('li');

      gsap.set(items, { x: -30, opacity: 0 });

      gsap.to(items, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // ==========================================
    // Philosophy/CTA Statement Animations
    // ==========================================
    document.querySelectorAll('.philosophy-statement.js-text-reveal, .cta-statement.js-text-reveal').forEach(element => {
      element.style.visibility = 'visible';

      gsap.set(element, { opacity: 0, y: 40 });

      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // Philosophy body
    document.querySelectorAll('.philosophy-body').forEach(element => {
      const paragraphs = element.querySelectorAll('p');

      gsap.set(paragraphs, { y: 30, opacity: 0 });

      gsap.to(paragraphs, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // ==========================================
    // Flow Item Animations
    // ==========================================
    document.querySelectorAll('[data-animate="flow-item"]').forEach((item) => {
      gsap.set(item, { opacity: 0, y: 50 });

      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // ==========================================
    // CTA Button Animation
    // ==========================================
    document.querySelectorAll('[data-animate="cta"]').forEach(element => {
      gsap.set(element, { y: 30, opacity: 0 });

      gsap.to(element, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // ==========================================
    // Marquee Section Animations
    // ==========================================
    document.querySelectorAll('.marquee-section').forEach(marquee => {
      gsap.set(marquee, { opacity: 0 });

      gsap.to(marquee, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: marquee,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    // ==========================================
    // Gallery Section Animation
    // ==========================================
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
      const galleryMarquees = gallerySection.querySelectorAll('.gallery-marquee');

      gsap.set(galleryMarquees, { opacity: 0, y: 30 });

      galleryMarquees.forEach((marquee, index) => {
        gsap.to(marquee, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: gallerySection,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse'
          }
        });
      });
    }

    // ==========================================
    // CTA Section Animation
    // ==========================================
    const ctaSection = document.querySelector('.section-cta');
    if (ctaSection) {
      const ctaContent = ctaSection.querySelector('.cta-content');

      if (ctaContent) {
        gsap.set(ctaContent, { opacity: 0, y: 60 });

        gsap.to(ctaContent, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse'
          }
        });
      }
    }

    // ==========================================
    // Footer Fade In
    // ==========================================
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      gsap.set(footerElement, { opacity: 0, y: 40 });

      gsap.to(footerElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerElement,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'play reverse play reverse'
        }
      });
    }

    // ==========================================
    // Parallax Effect
    // ==========================================
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

    // ScrollTriggerをリフレッシュして現在の状態を反映
    ScrollTrigger.refresh();
  }

  // ==========================================
  // Menu Toggle with GSAP Animation
  // ==========================================
  const menuBtn = document.getElementById('menuBtn');
  const fullscreenMenu = document.getElementById('fullscreenMenu');
  const menuItems = document.querySelectorAll('.menu-nav li');
  const menuContact = document.querySelector('.menu-contact');
  let isMenuOpen = false;

  function openMenu() {
    isMenuOpen = true;
    menuBtn.classList.add('active');
    fullscreenMenu.classList.add('active');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(menuItems,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.3 }
    );

    if (menuContact) {
      gsap.fromTo(menuContact,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      );
    }
  }

  function closeMenu() {
    isMenuOpen = false;

    gsap.to(menuItems, {
      x: -40,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      stagger: 0.03
    });

    if (menuContact) {
      gsap.to(menuContact, { opacity: 0, duration: 0.3 });
    }

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
