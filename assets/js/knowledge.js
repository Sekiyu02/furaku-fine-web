'use strict';

/**
 * knowledge.js - Knowledge page specific functionality
 * Requires common.js to be loaded first
 */

document.addEventListener('DOMContentLoaded', function() {
  // ========== Category Filter ==========
  var filterBtns = document.querySelectorAll('.filter-btn');
  var articleCards = document.querySelectorAll('.article-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var filter = btn.dataset.filter;

      // Filter articles
      articleCards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
