(function () {
  'use strict';

  var FORM_URL = 'https://useracademy.manageengine.com/course-feedback';

  function init() {
    var btn = document.getElementById('mue-feedback-btn');
    if (!btn) return; // No button on this page, do nothing

    // Build modal markup in JS (so HTML pasted in TC stays minimal)
    var modal = document.createElement('div');
    modal.id = 'mue-feedback-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Course Feedback');
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:99999;align-items:center;justify-content:center;';

    modal.innerHTML =
      '<div id="mue-feedback-backdrop" style="position:absolute;inset:0;background:rgba(15,15,20,0.65);"></div>' +
      '<div id="mue-feedback-panel" style="position:relative;width:min(720px,92vw);height:min(640px,88vh);background:#fff;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,0.4);display:flex;flex-direction:column;overflow:hidden;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #e5e7eb;font-family:\'Puvi\',\'Inter\',system-ui,sans-serif;font-weight:600;font-size:14px;color:#1a1a1a;flex-shrink:0;">' +
          '<span>Course Feedback</span>' +
          '<button id="mue-feedback-close" type="button" aria-label="Close" style="background:transparent;border:none;font-size:24px;line-height:1;cursor:pointer;color:#6b7280;padding:4px 8px;border-radius:4px;">&times;</button>' +
        '</div>' +
        '<iframe id="mue-feedback-iframe" title="Course Feedback Form" src="about:blank" style="flex:1;width:100%;border:0;display:block;"></iframe>' +
      '</div>';

    document.body.appendChild(modal);

    var iframe = modal.querySelector('#mue-feedback-iframe');
    var closeBtn = modal.querySelector('#mue-feedback-close');
    var backdrop = modal.querySelector('#mue-feedback-backdrop');
    var lastFocused = null;

    function openModal() {
      lastFocused = document.activeElement;
      if (iframe.src === 'about:blank' || iframe.src.indexOf('course-feedback') === -1) {
        iframe.src = FORM_URL;
      }
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    btn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.style.display !== 'none') closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();