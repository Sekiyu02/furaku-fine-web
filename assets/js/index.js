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

    // ========== Loading Screen ==========
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        startHeroAnimations();
      }, 3000);
    });

    // フォールバック：5秒後に強制的にローディングを非表示
    setTimeout(() => {
      const loading = document.getElementById('loading');
      if (loading && !loading.classList.contains('hidden')) {
        loading.classList.add('hidden');
        startHeroAnimations();
      }
    }, 5000);

    // ========== Fullscreen Menu ==========
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

    // ========== Hero Animations ==========
    function startHeroAnimations() {
      const heroLabel = document.querySelector('.hero-label');
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroCta = document.querySelector('.hero-cta');
      const heroScroll = document.querySelector('.hero-scroll');

      setTimeout(() => {
        heroLabel.style.transition = 'opacity 1s ease, transform 1s ease';
        heroLabel.style.opacity = '1';
        heroLabel.style.transform = 'translateY(0)';
      }, 200);

      setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        
        document.querySelectorAll('.hero-title .line span').forEach((span, i) => {
          setTimeout(() => {
            span.style.transition = 'transform 0.8s ease';
            span.style.transform = 'translateY(0)';
          }, i * 200);
        });
      }, 400);

      setTimeout(() => {
        heroSubtitle.style.transition = 'opacity 1s ease, transform 1s ease';
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 800);

      setTimeout(() => {
        heroCta.style.transition = 'opacity 1s ease, transform 1s ease';
        heroCta.style.opacity = '1';
        heroCta.style.transform = 'translateY(0)';
      }, 1000);

      setTimeout(() => {
        heroScroll.style.transition = 'opacity 1s ease';
        heroScroll.style.opacity = '1';
      }, 1200);
    }

    // ========== Hero Slideshow ==========
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentHeroSlide = 0;

    function nextHeroSlide() {
      heroSlides[currentHeroSlide].classList.remove('active');
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
    }

    setInterval(nextHeroSlide, 6000);

    // ========== Header Scroll Effect ==========
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

    // ========== Scroll Reveal Animations ==========
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== Parallax Effect (Optimized) - PC Only ==========
    if (!isMobile && !isTouchDevice) {
      const parallaxElements = document.querySelectorAll('.parallax');
      let parallaxTicking = false;

      function updateParallaxElements() {
        const windowCenterY = window.innerHeight / 2;
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.1;
          const rect = el.getBoundingClientRect();
          // Only calculate if element is near viewport
          if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
            const centerY = rect.top + rect.height / 2;
            const offset = (centerY - windowCenterY) * speed;
            el.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
          }
        });
        parallaxTicking = false;
      }

      window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
          requestAnimationFrame(updateParallaxElements);
          parallaxTicking = true;
        }
      }, { passive: true });
    }

    // ========== Custom Cursor (Optimized) ==========
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

    // ========== Text Stagger Animation ==========
    (function() {
      // Find all stagger-text elements
      const staggerElements = document.querySelectorAll('.stagger-text');

      staggerElements.forEach(el => {
        const keepHtml = el.hasAttribute('data-stagger-keep-html');

        if (keepHtml) {
          // For elements with complex HTML (like highlights and br tags)
          // Process text nodes only, preserving HTML structure
          processNodeForStagger(el);
        } else {
          // Simple text content - split all characters
          const text = el.textContent;
          el.innerHTML = '';

          text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = char === ' ' ? 'char space' : 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.03}s`;
            el.appendChild(span);
          });
        }
      });

      // Process nodes recursively for complex HTML
      function processNodeForStagger(element) {
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.trim()) {
            textNodes.push(node);
          }
        }

        let charIndex = 0;
        textNodes.forEach(textNode => {
          const text = textNode.textContent;
          const fragment = document.createDocumentFragment();

          text.split('').forEach(char => {
            if (char === '\n' || char === '\r') return;

            const span = document.createElement('span');
            span.className = char === ' ' ? 'char space' : 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${charIndex * 0.03}s`;
            fragment.appendChild(span);
            charIndex++;
          });

          textNode.parentNode.replaceChild(fragment, textNode);
        });
      }

      // Observe stagger elements for visibility
      const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

      staggerElements.forEach(el => staggerObserver.observe(el));
    })();

    // ========== 1. Magnetic Button Effect ==========
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

    // ========== 2. Inner Image Parallax (Optimized) - PC Only ==========
    if (!isMobile && !isTouchDevice) {
      const parallaxImages = document.querySelectorAll('.parallax-img');
      let imgParallaxTicking = false;

      function updateImageParallax() {
        const windowHeight = window.innerHeight;
        parallaxImages.forEach(img => {
          const wrap = img.closest('.parallax-img-wrap');
          if (!wrap) return;
          const rect = wrap.getBoundingClientRect();

          // 画面内に入っている時だけ計算
          if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const move = -10 + (progress * 20);
            img.style.transform = `translateY(${move}%) scale(1.1)`;
          }
        });
        imgParallaxTicking = false;
      }

      // Use native scroll event for parallax
      window.addEventListener('scroll', () => {
        if (!imgParallaxTicking) {
          requestAnimationFrame(updateImageParallax);
          imgParallaxTicking = true;
        }
      }, { passive: true });
      // Initial call
      updateImageParallax();
    }

    // ========== 3. Dynamic Footer Height for Reveal ==========
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
    window.addEventListener('load', () => {
      setTimeout(setFooterHeight, 100); // 画像読み込み待ちなどを考慮
    });

    // ========== 4. WORKS Section - Load from localStorage ==========
    (function() {
      const worksGrid = document.getElementById('worksGrid');
      const worksEmpty = document.getElementById('worksEmpty');
      const worksModal = document.getElementById('worksModal');
      const worksModalClose = document.getElementById('worksModalClose');

      // Sample works data (will be merged with localStorage data)
      const sampleWorks = [
        {
          id: 'sample-1',
          company: '医療法人A様',
          title: '採用ブランディングムービー制作',
          projectType: 'video',
          description: '理念を軸にした採用ブランディング映像を制作。院長の想いと現場の空気を可視化し、共感で人が集まる仕組みをつくりました。',
          thumbnailUrl: 'assets/images/works/work1.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          videoDuration: '3:24',
          videoCategory: 'YouTube',
          responsibilities: '企画・構成・撮影・編集・ナレーション',
          credits: 'プロデューサー：冨山大貴\nディレクター：友菜'
        }
      ];

      // Load from localStorage
      function loadWorks() {
        try {
          const saved = localStorage.getItem('furakuAdminData');
          if (saved) {
            const data = JSON.parse(saved);
            if (data.works && data.works.length > 0) {
              return data.works.filter(w => w.status === 'published').map(w => ({
                id: w.id,
                company: w.company,
                title: w.company + ' 様 支援実績',
                projectType: 'consulting',
                description: w.challenge + '\n\n' + w.solution + '\n\n' + w.result,
                thumbnailUrl: w.image || 'assets/images/works/default.jpg',
                responsibilities: w.solution,
                period: w.period
              }));
            }
          }
        } catch (e) {
          console.log('No works data in localStorage');
        }
        return [];
      }

      // Get YouTube video ID
      function getYouTubeId(url) {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        return match ? match[1] : null;
      }

      // Get project type label
      function getTypeLabel(type) {
        switch(type) {
          case 'video': return '映像制作';
          case 'branding': return '採用ブランディング';
          case 'consulting': return 'コンサルティング';
          default: return 'その他';
        }
      }

      // Render works
      function renderWorks() {
        const localWorks = loadWorks();
        // For now, show sample if no local works
        const works = localWorks.length > 0 ? localWorks : [];

        if (works.length === 0) {
          worksGrid.style.display = 'none';
          worksEmpty.style.display = 'block';
          return;
        }

        worksGrid.style.display = 'grid';
        worksEmpty.style.display = 'none';
        worksGrid.innerHTML = '';

        works.forEach(work => {
          const card = document.createElement('div');
          card.className = 'works-card reveal';
          card.innerHTML = `
            <div class="works-card-image">
              <img src="${work.thumbnailUrl || 'assets/images/works/default.jpg'}" alt="${work.title}" onerror="this.src='https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80'">
              <span class="works-card-type ${work.projectType}">${getTypeLabel(work.projectType)}</span>
              ${work.videoUrl ? `
              <div class="works-card-play">
                <div class="works-card-play-btn">
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>` : ''}
            </div>
            <div class="works-card-content">
              <p class="works-card-company">${work.company}</p>
              <h3 class="works-card-title">${work.title}</h3>
              <p class="works-card-desc">${work.description}</p>
              ${work.videoDuration ? `
              <p class="works-card-meta">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/>
                </svg>
                ${work.videoDuration} / ${work.videoCategory || 'YouTube'}
              </p>` : ''}
            </div>
          `;

          card.addEventListener('click', () => openModal(work));
          worksGrid.appendChild(card);
        });
      }

      // Open modal
      function openModal(work) {
        document.getElementById('worksModalType').textContent = getTypeLabel(work.projectType);
        document.getElementById('worksModalType').className = 'works-modal-type ' + work.projectType;
        document.getElementById('worksModalCompany').textContent = work.company;
        document.getElementById('worksModalTitle').textContent = work.title;

        if (work.videoDuration) {
          document.getElementById('worksModalDuration').textContent = `再生時間：${work.videoDuration}　／　${work.videoCategory || 'YouTube'}`;
          document.getElementById('worksModalDuration').style.display = 'block';
        } else {
          document.getElementById('worksModalDuration').style.display = 'none';
        }

        document.getElementById('worksModalDesc').textContent = work.description;

        if (work.responsibilities) {
          document.getElementById('worksModalResponsibilities').textContent = work.responsibilities;
          document.getElementById('worksModalResponsibilitiesSection').style.display = 'block';
        } else {
          document.getElementById('worksModalResponsibilitiesSection').style.display = 'none';
        }

        if (work.credits) {
          document.getElementById('worksModalCredits').textContent = work.credits;
          document.getElementById('worksModalCreditsSection').style.display = 'block';
        } else {
          document.getElementById('worksModalCreditsSection').style.display = 'none';
        }

        // Video embed
        const videoContainer = document.getElementById('worksModalVideo');
        const youtubeId = getYouTubeId(work.videoUrl);
        if (youtubeId) {
          videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}" title="${work.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          videoContainer.style.display = 'block';
        } else {
          videoContainer.innerHTML = '';
          videoContainer.style.display = 'none';
        }

        worksModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      // Close modal
      function closeModal() {
        worksModal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('worksModalVideo').innerHTML = '';
      }

      worksModalClose.addEventListener('click', closeModal);
      worksModal.addEventListener('click', (e) => {
        if (e.target === worksModal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && worksModal.classList.contains('active')) closeModal();
      });

      // Initialize
      renderWorks();
    })();
