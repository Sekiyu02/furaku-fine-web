'use strict';

/**
 * recruitment.js - Recruitment page specific functionality
 * Requires common.js to be loaded first
 */

document.addEventListener('DOMContentLoaded', function() {
  // ========== FAQ Accordion ==========
  var faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('active');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('active');
        var ans = i.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('active');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  // ========== Roadmap Timeline Animation (Scroll Linked) ==========
  var roadmapTimeline = document.querySelector('.roadmap-timeline');
  var roadmapNodes = document.querySelectorAll('.roadmap-node');

  function updateRoadmapTimeline() {
    if (!roadmapTimeline) return;

    var rect = roadmapTimeline.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    var start = windowHeight * 0.8;

    // Calculate progress
    var progress = (start - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));

    // Update CSS variable
    roadmapTimeline.style.setProperty('--line-height', (progress * 100) + '%');

    // Activate nodes based on progress
    roadmapNodes.forEach(function(node, index) {
      var nodeProgress = (index + 1) / roadmapNodes.length;
      if (progress >= nodeProgress - 0.1) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  // Only start animation loop if timeline exists
  if (roadmapTimeline) {
    requestAnimationFrame(function loop() {
      updateRoadmapTimeline();
      requestAnimationFrame(loop);
    });
  }
});
