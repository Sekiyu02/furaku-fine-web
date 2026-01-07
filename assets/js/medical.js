'use strict';

/**
 * medical.js - Medical page specific functionality
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

  // ========== Flow Timeline Animation (Scroll Linked) ==========
  var timeline = document.querySelector('.flow-timeline');

  function updateTimeline() {
    if (!timeline) return;

    var rect = timeline.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    var start = windowHeight * 0.8;

    // Calculate progress through the timeline
    var progress = (start - rect.top) / rect.height;

    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // Update CSS variable for the animated line
    timeline.style.setProperty('--line-height', (progress * 100) + '%');
  }

  // Only start animation loop if timeline exists
  if (timeline) {
    requestAnimationFrame(function loop() {
      updateTimeline();
      requestAnimationFrame(loop);
    });
  }
});
