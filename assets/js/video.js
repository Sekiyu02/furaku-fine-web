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
    // Enhanced loader animation with GSAP
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
        // ローダーを非表示にしてから次へ
        loader.style.display = 'none';
      })
      .add(() => {
        // ヘッダー要素を表示
        gsap.to('.logo img, .menu-btn', {
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        });
      })
      .add(() => {
        // ヒーローアニメーションを開始（少し遅延）
        initHeroAnimations();
      }, '+=0.2');
  }

  // Start loader animation when page loads
  window.addEventListener('load', startLoaderAnimation);

  // Fallback: start after 2 seconds if load event doesn't fire
  setTimeout(() => {
    if (loader && loader.style.display !== 'none') {
      startLoaderAnimation();
    }
  }, 2000);

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
        // 初期状態：非表示、ぼかし、少し下に配置
        result += `<span class="char" style="opacity:0; filter:blur(8px); transform:translateY(10px); display:inline-block;">${char}</span>`;
      }
    }

    element.innerHTML = result;
    return element.querySelectorAll('.char');
  }

  // 配列をシャッフルする関数
  function shuffleArray(array) {
    const arr = Array.from(array);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ==========================================
  // Hero Animations (runs after loading)
  // バラバラにふわっと浮かび上がる
  // ==========================================
  function initHeroAnimations() {
    // Hero Statement Animation - ふわっと浮かび上がる
    const heroStatement = document.querySelector('.hero-statement.js-text-reveal');
    if (heroStatement) {
      // まず要素を表示可能な状態にする
      heroStatement.style.visibility = 'visible';

      const chars = splitTextToChars(heroStatement);
      heroStatement.style.opacity = '1';

      const shuffledChars = shuffleArray(chars);
      shuffledChars.forEach((char, i) => {
        gsap.to(char, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: i * 0.025
        });
      });
    }

    // Hero Title Animation - ふわっと浮かび上がる
    const heroTitle = document.querySelector('.hero-title.js-text-reveal');
    if (heroTitle) {
      heroTitle.style.visibility = 'visible';

      const chars = splitTextToChars(heroTitle);
      heroTitle.style.opacity = '1';

      const shuffledChars = shuffleArray(chars);
      shuffledChars.forEach((char, i) => {
        gsap.to(char, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.5 + i * 0.025
        });
      });
    }

    // Hero Subtitle Animation - ふわっとフェードイン
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      gsap.to(heroSubtitle, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 1.5
      });
    }

    // Scroll Indicator Animation - ふわっと表示
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power2.out',
        delay: 2.2
      });
    }
  }

  // ==========================================
  // Scroll Indicator Fade
  // ==========================================
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

  // ==========================================
  // Hero Section Fade Out on Scroll (JR高島屋風)
  // ==========================================
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

  // Hero背景のパララックス（ズーム効果）
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
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
  // Section Fade In/Out Animation (JR高島屋風)
  // ==========================================
  document.querySelectorAll('.section').forEach(section => {
    const content = section.querySelector('.section-container');

    if (content) {
      // フェードアウト（上に消える）- scrubで滑らかに
      gsap.to(content, {
        opacity: 0,
        y: -50,
        filter: 'blur(5px)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 60%',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  });

  // ==========================================
  // Marquee Section Animations
  // ==========================================
  document.querySelectorAll('.marquee-section').forEach(marquee => {
    gsap.set(marquee, { opacity: 0 });

    // フェードイン
    gsap.to(marquee, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: marquee,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });

    // フェードアウト
    gsap.to(marquee, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: marquee,
        start: 'bottom 50%',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  // ==========================================
  // Gallery Section Animation
  // ==========================================
  const gallerySection = document.querySelector('.gallery-section');
  if (gallerySection) {
    const galleryMarquees = gallerySection.querySelectorAll('.gallery-marquee');

    // ギャラリーのフェードイン（順番に）
    galleryMarquees.forEach((marquee, index) => {
      gsap.set(marquee, { opacity: 0, y: 30 });
      gsap.to(marquee, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gallerySection,
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.2
      });
    });

    // セクション全体のフェードアウト
    gsap.to(gallerySection, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: gallerySection,
        start: 'bottom 50%',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  // ==========================================
  // Philosophy Section - より印象的なアニメーション
  // ==========================================
  const philosophySection = document.querySelector('.section-philosophy');
  if (philosophySection) {
    const statement = philosophySection.querySelector('.philosophy-statement');

    // ステートメントのパララックス効果
    if (statement) {
      gsap.to(statement, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: philosophySection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }

    // セクションが離れる時のフェードアウト
    const philosophyContainer = philosophySection.querySelector('.section-container');
    if (philosophyContainer) {
      gsap.to(philosophyContainer, {
        opacity: 0,
        y: -80,
        filter: 'blur(8px)',
        ease: 'none',
        scrollTrigger: {
          trigger: philosophySection,
          start: 'bottom 60%',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // ==========================================
  // CTA Section Animation
  // ==========================================
  const ctaSection = document.querySelector('.section-cta');
  if (ctaSection) {
    const ctaContent = ctaSection.querySelector('.cta-content');

    if (ctaContent) {
      gsap.set(ctaContent, {
        opacity: 0,
        y: 80,
        scale: 0.98
      });

      gsap.to(ctaContent, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  // ==========================================
  // Footer Fade In
  // ==========================================
  const footerElement = document.querySelector('footer');
  if (footerElement) {
    gsap.set(footerElement, {
      opacity: 0,
      y: 40
    });

    gsap.to(footerElement, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerElement,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  }

  // ==========================================
  // Section Header Animations (Staggered Reveal) - 更新版
  // ==========================================
  document.querySelectorAll('.section-header').forEach(header => {
    const label = header.querySelector('.section-label');
    const title = header.querySelector('.section-title-en');

    // 初期状態（ぼかし付き）
    if (label) gsap.set(label, { opacity: 0, y: 30, filter: 'blur(5px)' });
    if (title) gsap.set(title, { opacity: 0, y: 40, filter: 'blur(5px)' });

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
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out'
          });
        }
        if (title) {
          tl.to(title, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out'
          }, '-=0.5');
        }
      }
    });
  });

  // ==========================================
  // Gallery Header Animation - 更新版
  // ==========================================
  const galleryHeader = document.querySelector('.gallery-header');
  if (galleryHeader) {
    const label = galleryHeader.querySelector('.section-label');
    const title = galleryHeader.querySelector('.section-title-en');

    if (label) gsap.set(label, { opacity: 0, y: 30, filter: 'blur(5px)' });
    if (title) gsap.set(title, { opacity: 0, y: 40, filter: 'blur(5px)' });

    ScrollTrigger.create({
      trigger: galleryHeader,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        if (label) tl.to(label, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' });
        if (title) tl.to(title, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }, '-=0.5');
      }
    });
  }

  // ==========================================
  // Scroll-Triggered Text Animations
  // バラバラにふわっと浮かび上がる
  // ==========================================
  document.querySelectorAll('.section-title.js-text-reveal, .closing-statement.js-text-reveal, .philosophy-statement.js-text-reveal, .cta-statement.js-text-reveal').forEach(element => {
    // まず要素を表示可能な状態にする
    element.style.visibility = 'visible';

    // Split text into characters (初期状態はインラインスタイルで非表示)
    const chars = splitTextToChars(element);
    // テキスト分割後にコンテナを表示（各文字は個別に非表示のまま）
    element.style.opacity = '1';
    const shuffledChars = shuffleArray(chars);

    // Create scroll-triggered animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // シャッフルした順番でアニメーション
        shuffledChars.forEach((char, i) => {
          gsap.to(char, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: i * 0.025
          });
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
  // Flow Item Animations - 順番にふわっと登場
  // ==========================================
  document.querySelectorAll('[data-animate="flow-item"]').forEach((item, index) => {
    gsap.set(item, {
      opacity: 0,
      y: 60,
      scale: 0.95
    });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1
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
