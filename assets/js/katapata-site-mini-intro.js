/*
 * KATAPATA site-only mini intro
 * Place this script in the site copy of tools/sloper/app/katapata.html.
 * It keeps the standalone KATAPATA full intro untouched.
 */
(function () {
  'use strict';

  function runMiniIntro() {
    var overlay = document.getElementById('openingOverlay');
    if (!overlay) return;

    var logo = document.getElementById('openingLogo');
    var tagline = document.getElementById('openingTagline');
    var canvasWrap = document.querySelector('.openingCanvasWrap');
    var canvas = document.getElementById('openingCanvas');
    var enter = document.getElementById('openingEnter');

    document.body.classList.add('site-mini-boot');
    document.body.classList.add('opening-active');

    if (logo && !logo.textContent.trim()) {
      logo.textContent = 'KATAPATA';
    }
    if (tagline && !tagline.textContent.trim()) {
      tagline.textContent = 'Automatic Sloper Drafting Tool';
    }

    if (canvasWrap) {
      canvasWrap.setAttribute('aria-hidden', 'true');
    }
    if (canvas) {
      canvas.setAttribute('aria-hidden', 'true');
      try {
        var ctx = canvas.getContext && canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width || 0, canvas.height || 0);
      } catch (e) {}
    }
    if (enter) {
      enter.setAttribute('aria-hidden', 'true');
      enter.tabIndex = -1;
    }

    var reduceMotion = false;
    try {
      reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    var fadeDelay = reduceMotion ? 250 : 1350;
    var removeDelay = reduceMotion ? 500 : 1950;

    window.setTimeout(function () {
      document.body.classList.add('site-mini-fade');
    }, fadeDelay);

    window.setTimeout(function () {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('opening-active');
      document.body.classList.remove('site-mini-boot');
      document.body.classList.remove('site-mini-fade');
      document.body.classList.add('site-mini-finished');
    }, removeDelay);
  }

  function injectStyle() {
    if (document.getElementById('katapataSiteMiniIntroStyle')) return;

    var css = '' +
      'body.site-mini-boot { overflow: hidden; }\n' +
      'body.site-mini-boot .openingOverlay {\n' +
      '  position: fixed !important;\n' +
      '  inset: 0 !important;\n' +
      '  z-index: 99999 !important;\n' +
      '  display: grid !important;\n' +
      '  place-items: center !important;\n' +
      '  background: radial-gradient(circle at 50% 44%, #fffdf8 0%, #f8f2e8 46%, #eee2d2 100%) !important;\n' +
      '  opacity: 1;\n' +
      '  visibility: visible;\n' +
      '  transition: opacity .58s ease, visibility .58s ease;\n' +
      '}\n' +
      'body.site-mini-boot.site-mini-fade .openingOverlay {\n' +
      '  opacity: 0 !important;\n' +
      '  visibility: hidden !important;\n' +
      '  pointer-events: none !important;\n' +
      '}\n' +
      'body.site-mini-boot .openingStage,\n' +
      'body.site-mini-boot .openingIntro {\n' +
      '  width: min(92vw, 760px) !important;\n' +
      '  min-height: auto !important;\n' +
      '  display: grid !important;\n' +
      '  place-items: center !important;\n' +
      '  text-align: center !important;\n' +
      '  padding: 0 !important;\n' +
      '}\n' +
      'body.site-mini-boot .openingCanvasWrap,\n' +
      'body.site-mini-boot #openingCanvas,\n' +
      'body.site-mini-boot .openingEnter,\n' +
      'body.site-mini-boot #openingEnter {\n' +
      '  display: none !important;\n' +
      '  opacity: 0 !important;\n' +
      '  pointer-events: none !important;\n' +
      '}\n' +
      'body.site-mini-boot #openingLogo {\n' +
      '  display: block !important;\n' +
      '  width: auto !important;\n' +
      '  height: auto !important;\n' +
      '  margin: 0 0 16px !important;\n' +
      '  padding: 0 !important;\n' +
      '  background: none !important;\n' +
      '  border: 0 !important;\n' +
      '  box-shadow: none !important;\n' +
      '  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;\n' +
      '  font-size: clamp(42px, 10vw, 92px) !important;\n' +
      '  line-height: 1 !important;\n' +
      '  font-weight: 950 !important;\n' +
      '  letter-spacing: .14em !important;\n' +
      '  color: #3c332b !important;\n' +
      '  text-shadow: 0 8px 22px rgba(61, 48, 36, .10) !important;\n' +
      '  opacity: 0;\n' +
      '  transform: translateY(10px) scale(.985);\n' +
      '  animation: katapataSiteMiniLogoIn .72s cubic-bezier(.22, .8, .22, 1) .08s forwards;\n' +
      '}\n' +
      'body.site-mini-boot #openingTagline {\n' +
      '  display: block !important;\n' +
      '  margin: 0 !important;\n' +
      '  padding: 0 !important;\n' +
      '  font-size: clamp(12px, 2.2vw, 16px) !important;\n' +
      '  line-height: 1.6 !important;\n' +
      '  font-weight: 800 !important;\n' +
      '  letter-spacing: .14em !important;\n' +
      '  color: rgba(88, 73, 59, .62) !important;\n' +
      '  opacity: 0;\n' +
      '  transform: translateY(8px);\n' +
      '  animation: katapataSiteMiniTaglineIn .62s ease .28s forwards;\n' +
      '}\n' +
      '@keyframes katapataSiteMiniLogoIn {\n' +
      '  from { opacity: 0; transform: translateY(10px) scale(.985); }\n' +
      '  to { opacity: 1; transform: translateY(0) scale(1); }\n' +
      '}\n' +
      '@keyframes katapataSiteMiniTaglineIn {\n' +
      '  from { opacity: 0; transform: translateY(8px); }\n' +
      '  to { opacity: 1; transform: translateY(0); }\n' +
      '}\n' +
      '@media (prefers-reduced-motion: reduce) {\n' +
      '  body.site-mini-boot #openingLogo,\n' +
      '  body.site-mini-boot #openingTagline {\n' +
      '    animation-duration: .01ms !important;\n' +
      '    animation-delay: 0s !important;\n' +
      '  }\n' +
      '  body.site-mini-boot .openingOverlay { transition-duration: .01ms !important; }\n' +
      '}\n';

    var style = document.createElement('style');
    style.id = 'katapataSiteMiniIntroStyle';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init() {
    injectStyle();
    runMiniIntro();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
