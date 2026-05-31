/*
 * KATAPATA site-only mini intro: original-logo version, no pre-flash.
 * - Uses the existing KATAPATA opening logo letters.
 * - Blocks the original full opening animation visually before this file runs.
 * - Hides pencil/canvas and ENTER button.
 * - Auto-enters the measurement screen after a short logo display.
 */
(function () {
  'use strict';

  var LOGO_LETTER_DELAY = 0.075;
  var LOGO_DURATION = 0.36;
  var TAGLINE_DELAY_MS = 620;
  var AUTO_ENTER_MS = 1480;

  function injectStyle() {
    if (document.getElementById('katapataSiteMiniIntroOriginalStyle')) return;

    var css = '' +
      'body.site-mini-original-boot { overflow: hidden; }\n' +
      'body.site-mini-original-boot .openingCanvasWrap,\n' +
      'body.site-mini-original-boot #openingCanvas,\n' +
      'body.site-mini-original-boot .openingEnter,\n' +
      'body.site-mini-original-boot #openingEnter {\n' +
      '  display: none !important;\n' +
      '  opacity: 0 !important;\n' +
      '  pointer-events: none !important;\n' +
      '}\n' +
      'body.site-mini-original-boot .openingIntro {\n' +
      '  gap: clamp(10px, 2.4vh, 20px) !important;\n' +
      '}\n' +
      'body.site-mini-original-boot #openingLogo {\n' +
      '  margin: 0 !important;\n' +
      '}\n' +
      'body.site-mini-original-boot #openingTagline {\n' +
      '  margin-top: 2px !important;\n' +
      '}\n' +
      '/* Site-embedded KATAPATA: calmer UI outside the drafting SVG. */\n' +
      'body { background: #f8f5ef !important; color: #24211f; }\n' +
      '.wrap { padding: 18px !important; }\n' +
      '.card { border-color: #e4ded4 !important; box-shadow: 0 14px 38px rgba(0,0,0,.07) !important; }\n' +
      '.top, .appTop { background: #fffdf8 !important; border-bottom-color: #eee6da !important; }\n' +
      '.appBrand h1, h1 { font-size: 16px !important; letter-spacing: .10em !important; }\n' +
      '.appBrand .note, .note { font-size: 9px !important; color: #8e7e68 !important; line-height: 1.45 !important; }\n' +
      '.brandmark { background: #f0e8dc !important; color: #5d5247 !important; }\n' +
      '.panel { background: #fffdf8 !important; border-color: #eee6da !important; }\n' +
      '.panel h2, .panelTitleRow h2 { font-size: 12.5px !important; letter-spacing: .01em !important; color: #2f2a24 !important; }\n' +
      '.stage, .appStagebar .stage, .parttabs .stage { font-size: 10px !important; color: #746c64; border-color: #ded5ca !important; background: #fbf8f2 !important; }\n' +
      '.stage.active, .appStagebar .stage.active, .parttabs .stage.active { background: #171717 !important; color: #fffdf8 !important; border-color: #171717 !important; }\n' +
      '.stageCaption, .metricNote, .toolHint, .partIntro, .adjustMiniIntro, .dartMiniText, .confirmMiniText, .outputMiniText, .printNote, .measureMiniNote { font-size: 10.5px !important; line-height: 1.5 !important; color: #5d5247 !important; background: #fffaf2 !important; border-color: #eee6da !important; }\n' +
      '.measureEntryTitle { font-size: 13px !important; color: #2f2a24 !important; }\n' +
      '.measureHeroTitle strong { font-size: 13px !important; }\n' +
      '.measureHeroTitle span, .measureEntryBadge { font-size: 7.5px !important; }\n' +
      '.measureInputLabel strong { font-size: 9.5px !important; }\n' +
      '.measureInputHint { font-size: 7px !important; }\n' +
      'button, .printAction { letter-spacing: .01em !important; }\n' +
      '@media (max-width: 560px) { .wrap { padding: 10px !important; } .appBrand h1, h1 { font-size: 15px !important; } .panel h2, .panelTitleRow h2 { font-size: 12px !important; } }\n' +
      '@media (prefers-reduced-motion: reduce) {\n' +
      '  body.site-mini-original-boot .openingLetter {\n' +
      '    animation-duration: .01ms !important;\n' +
      '    animation-delay: 0s !important;\n' +
      '  }\n' +
      '}\n';

    var style = document.createElement('style');
    style.id = 'katapataSiteMiniIntroOriginalStyle';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function removeEarlyBlocker() {
    var blocker = document.getElementById('katapataSiteMiniIntroBootBlocker');
    if (blocker && blocker.parentNode) blocker.parentNode.removeChild(blocker);
  }

  function ensureOriginalLetters(logo) {
    if (!logo) return [];
    var letters = Array.prototype.slice.call(logo.querySelectorAll('.openingLetter'));
    if (letters.length) return letters;

    // Fallback only. Usually the original KATAPATA script has already created these spans.
    if (!logo.textContent.trim()) {
      'KATAPATA'.split('').forEach(function (char) {
        var span = document.createElement('span');
        span.textContent = char;
        span.className = 'openingLetter';
        logo.appendChild(span);
      });
      letters = Array.prototype.slice.call(logo.querySelectorAll('.openingLetter'));
    }
    return letters;
  }

  function primeLogo(letters) {
    letters.forEach(function (span) {
      span.style.animation = 'none';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
    });
  }

  function restartLogoAnimation(logo, letters) {
    if (!logo || !letters.length) return;

    // Force reflow so the shortened original-letter animation starts cleanly.
    void logo.offsetWidth;

    letters.forEach(function (span, index) {
      span.style.animation = 'openingFadeIn ' + LOGO_DURATION + 's forwards';
      span.style.animationDelay = (index * LOGO_LETTER_DELAY) + 's';
    });
  }

  function manualLeave(overlay) {
    if (!overlay) return;
    overlay.classList.add('is-leaving');
    document.body.classList.remove('opening-active');
    if (typeof window.setStage === 'function') {
      try { window.setStage('measure'); } catch (e) {}
    }
    window.setTimeout(function () {
      overlay.style.display = 'none';
    }, 650);
  }

  function run() {
    var overlay = document.getElementById('openingOverlay');
    var logo = document.getElementById('openingLogo');
    var tagline = document.getElementById('openingTagline');
    var canvas = document.getElementById('openingCanvas');
    var canvasWrap = document.querySelector('.openingCanvasWrap');
    var enter = document.getElementById('openingEnter');

    if (!overlay || !logo) return;

    var letters = ensureOriginalLetters(logo);
    primeLogo(letters);

    injectStyle();
    document.body.classList.add('site-mini-original-boot');
    document.body.classList.add('opening-active');

    if (canvasWrap) canvasWrap.setAttribute('aria-hidden', 'true');
    if (canvas) canvas.setAttribute('aria-hidden', 'true');
    if (enter) {
      enter.setAttribute('aria-hidden', 'true');
      enter.tabIndex = -1;
    }

    if (tagline) {
      tagline.classList.remove('show');
      tagline.style.opacity = '0';
      tagline.style.transform = 'translateY(6px)';
    }

    // Remove the head-level blocker only after the logo has been reset to invisible.
    removeEarlyBlocker();

    restartLogoAnimation(logo, letters);

    if (tagline) {
      window.setTimeout(function () {
        tagline.style.opacity = '';
        tagline.style.transform = '';
        tagline.classList.add('show');
      }, TAGLINE_DELAY_MS);
    }

    window.setTimeout(function () {
      // Use the original ENTER handler when it exists, so the original setStage/cleanup runs.
      if (enter && typeof enter.click === 'function') {
        enter.click();
      } else {
        manualLeave(overlay);
      }
      window.setTimeout(function () {
        document.body.classList.remove('site-mini-original-boot');
      }, 700);
    }, AUTO_ENTER_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
