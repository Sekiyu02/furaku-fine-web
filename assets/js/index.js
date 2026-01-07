'use strict';

/**
 * index.js - Index page specific functionality
 * Requires common.js to be loaded first
 */

document.addEventListener('DOMContentLoaded', function() {
  // ========== Hero Slideshow ==========
  var heroSlides = document.querySelectorAll('.hero-slide');
  var currentHeroSlide = 0;

  function nextHeroSlide() {
    if (heroSlides.length === 0) return;
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
  }

  if (heroSlides.length > 0) {
    setInterval(nextHeroSlide, 6000);
  }

  // ========== WORKS Section - Load from localStorage ==========
  (function() {
    var worksGrid = document.getElementById('worksGrid');
    var worksEmpty = document.getElementById('worksEmpty');
    var worksModal = document.getElementById('worksModal');
    var worksModalClose = document.getElementById('worksModalClose');

    if (!worksGrid) return;

    function loadWorks() {
      try {
        var saved = localStorage.getItem('furakuAdminData');
        if (saved) {
          var data = JSON.parse(saved);
          if (data.works && data.works.length > 0) {
            return data.works.filter(function(w) {
              return w.status === 'published';
            }).map(function(w) {
              return {
                id: w.id,
                company: w.company,
                title: w.company + ' 様 支援実績',
                projectType: 'consulting',
                description: w.challenge + '\n\n' + w.solution + '\n\n' + w.result,
                thumbnailUrl: w.image || 'assets/images/works/default.jpg',
                responsibilities: w.solution,
                period: w.period
              };
            });
          }
        }
      } catch (e) {
        console.log('No works data in localStorage');
      }
      return [];
    }

    function getYouTubeId(url) {
      if (!url) return null;
      var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
      return match ? match[1] : null;
    }

    function getTypeLabel(type) {
      switch(type) {
        case 'video': return '映像制作';
        case 'branding': return '採用ブランディング';
        case 'consulting': return 'コンサルティング';
        default: return 'その他';
      }
    }

    function renderWorks() {
      var works = loadWorks();

      if (works.length === 0) {
        worksGrid.style.display = 'none';
        if (worksEmpty) worksEmpty.style.display = 'block';
        return;
      }

      worksGrid.style.display = 'grid';
      if (worksEmpty) worksEmpty.style.display = 'none';
      worksGrid.innerHTML = '';

      works.forEach(function(work) {
        var card = document.createElement('div');
        card.className = 'works-card reveal';

        var cardHTML = '<div class="works-card-image">' +
          '<img src="' + (work.thumbnailUrl || 'assets/images/works/default.jpg') + '" alt="' + work.title + '" onerror="this.src=\'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80\'">' +
          '<span class="works-card-type ' + work.projectType + '">' + getTypeLabel(work.projectType) + '</span>';

        if (work.videoUrl) {
          cardHTML += '<div class="works-card-play"><div class="works-card-play-btn"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>';
        }

        cardHTML += '</div><div class="works-card-content">' +
          '<p class="works-card-company">' + work.company + '</p>' +
          '<h3 class="works-card-title">' + work.title + '</h3>' +
          '<p class="works-card-desc">' + work.description + '</p>';

        if (work.videoDuration) {
          cardHTML += '<p class="works-card-meta"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>' + work.videoDuration + ' / ' + (work.videoCategory || 'YouTube') + '</p>';
        }

        cardHTML += '</div>';
        card.innerHTML = cardHTML;

        card.addEventListener('click', function() {
          openModal(work);
        });
        worksGrid.appendChild(card);
      });
    }

    function openModal(work) {
      if (!worksModal) return;

      var modalType = document.getElementById('worksModalType');
      var modalCompany = document.getElementById('worksModalCompany');
      var modalTitle = document.getElementById('worksModalTitle');
      var modalDuration = document.getElementById('worksModalDuration');
      var modalDesc = document.getElementById('worksModalDesc');
      var modalResponsibilities = document.getElementById('worksModalResponsibilities');
      var modalResponsibilitiesSection = document.getElementById('worksModalResponsibilitiesSection');
      var modalCredits = document.getElementById('worksModalCredits');
      var modalCreditsSection = document.getElementById('worksModalCreditsSection');
      var videoContainer = document.getElementById('worksModalVideo');

      if (modalType) {
        modalType.textContent = getTypeLabel(work.projectType);
        modalType.className = 'works-modal-type ' + work.projectType;
      }
      if (modalCompany) modalCompany.textContent = work.company;
      if (modalTitle) modalTitle.textContent = work.title;

      if (modalDuration) {
        if (work.videoDuration) {
          modalDuration.textContent = '再生時間：' + work.videoDuration + '　／　' + (work.videoCategory || 'YouTube');
          modalDuration.style.display = 'block';
        } else {
          modalDuration.style.display = 'none';
        }
      }

      if (modalDesc) modalDesc.textContent = work.description;

      if (modalResponsibilitiesSection) {
        if (work.responsibilities) {
          if (modalResponsibilities) modalResponsibilities.textContent = work.responsibilities;
          modalResponsibilitiesSection.style.display = 'block';
        } else {
          modalResponsibilitiesSection.style.display = 'none';
        }
      }

      if (modalCreditsSection) {
        if (work.credits) {
          if (modalCredits) modalCredits.textContent = work.credits;
          modalCreditsSection.style.display = 'block';
        } else {
          modalCreditsSection.style.display = 'none';
        }
      }

      if (videoContainer) {
        var youtubeId = getYouTubeId(work.videoUrl);
        if (youtubeId) {
          videoContainer.innerHTML = '<iframe src="https://www.youtube.com/embed/' + youtubeId + '" title="' + work.title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
          videoContainer.style.display = 'block';
        } else {
          videoContainer.innerHTML = '';
          videoContainer.style.display = 'none';
        }
      }

      worksModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!worksModal) return;
      worksModal.classList.remove('active');
      document.body.style.overflow = '';
      var videoContainer = document.getElementById('worksModalVideo');
      if (videoContainer) videoContainer.innerHTML = '';
    }

    if (worksModalClose) {
      worksModalClose.addEventListener('click', closeModal);
    }

    if (worksModal) {
      worksModal.addEventListener('click', function(e) {
        if (e.target === worksModal) closeModal();
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && worksModal && worksModal.classList.contains('active')) {
        closeModal();
      }
    });

    renderWorks();
  })();
});
