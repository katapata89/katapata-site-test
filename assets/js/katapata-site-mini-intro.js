/*
 * KATAPATA site-only mini intro: original-logo version
 * + site output-copy patch
 * - Uses the existing KATAPATA opening logo letters.
 * - Hides pencil/canvas and ENTER button.
 * - Auto-enters the measurement screen after a short logo display.
 * - Clarifies paid output as one "printable PDF set" including normal-size + A4 tiled PDFs.
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
      '.site-paid-set-summary {\n' +
      '  margin-top: 8px !important;\n' +
      '  margin-bottom: 8px !important;\n' +
      '}\n' +
      '.site-paid-set-summary strong {\n' +
      '  color: #2f2923;\n' +
      '}\n' +
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

  function restartLogoAnimation(logo, letters) {
    if (!logo || !letters.length) return;

    letters.forEach(function (span) {
      span.style.animation = 'none';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
    });

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

  function runMiniIntro() {
    var overlay = document.getElementById('openingOverlay');
    var logo = document.getElementById('openingLogo');
    var tagline = document.getElementById('openingTagline');
    var canvas = document.getElementById('openingCanvas');
    var canvasWrap = document.querySelector('.openingCanvasWrap');
    var enter = document.getElementById('openingEnter');

    if (!overlay || !logo) return;

    injectStyle();
    document.body.classList.add('site-mini-original-boot');
    document.body.classList.add('opening-active');

    if (canvasWrap) canvasWrap.setAttribute('aria-hidden', 'true');
    if (canvas) canvas.setAttribute('aria-hidden', 'true');
    if (enter) {
      enter.setAttribute('aria-hidden', 'true');
      enter.tabIndex = -1;
    }

    var letters = ensureOriginalLetters(logo);
    restartLogoAnimation(logo, letters);

    if (tagline) {
      tagline.classList.remove('show');
      window.setTimeout(function () {
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

  function setButtonTexts(button, strongText, smallText, onclickText) {
    if (!button) return;
    if (onclickText) button.setAttribute('onclick', onclickText);

    var strong = button.querySelector('strong');
    if (strong) strong.textContent = strongText;

    var small = button.querySelector('small');
    if (small) small.textContent = smallText;
  }

  function upsertPaidSetSummary(panel) {
    if (!panel || panel.querySelector('.site-paid-set-summary')) return;

    var printActions = panel.querySelector('.printActions');
    if (!printActions) return;

    var summary = document.createElement('div');
    summary.className = 'outputMiniText site-paid-set-summary';
    summary.innerHTML = '<div class="outputMiniTextInner"><span><strong>有料：印刷用PDFセット</strong>　購入後、通常サイズPDFとA4分割印刷PDFの両方が使えます。</span></div>';
    printActions.parentNode.insertBefore(summary, printActions);
  }

  function patchNotes(panel) {
    if (!panel) return;

    var notes = Array.prototype.slice.call(panel.querySelectorAll('.outputCompactNote'));
    notes.forEach(function (note) {
      var text = note.textContent || '';
      if (text.indexOf('通常サイズPDF') !== -1 || text.indexOf('A4分割') !== -1 || text.indexOf('有料機能') !== -1) {
        note.classList.add('paid');
        note.innerHTML = '<strong>有料：印刷用PDFセット</strong>：購入後、通常サイズPDFとA4分割印刷PDFの両方を利用できます。';
      } else if (text.indexOf('縮小サンプルPDF') !== -1 && text.indexOf('実寸') !== -1) {
        note.innerHTML = '<strong>無料：縮小サンプルPDF</strong> は形や配置の確認用です。<strong>実寸ではありません。</strong>';
      }
    });

    var saveMessage = panel.querySelector('#saveMessage');
    if (saveMessage && /縮小サンプル|通常サイズ|A4分割|PDF出力/.test(saveMessage.textContent || '')) {
      saveMessage.innerHTML = '<strong>PDF出力</strong><small>無料の縮小サンプルと、有料の印刷用PDFセットに対応しています。</small>';
    }
  }

  function patchPaidNotice() {
    Array.prototype.slice.call(document.querySelectorAll('.paidInlineNotice')).forEach(function (notice) {
      var strong = notice.querySelector('strong');
      if (strong) strong.textContent = '🔒 印刷用PDFセットは有料機能です';

      var p = notice.querySelector('p');
      if (p) p.textContent = '購入後、通常サイズPDFとA4分割印刷PDFの両方が使えます。無料版では縮小サンプルPDFを出力できます。';

      var purchaseButton = notice.querySelector('.paidInlineActions button:not(.sub)');
      if (purchaseButton) {
        purchaseButton.textContent = '購入ページへ';
        purchaseButton.setAttribute('onclick', "purchasePaidExport('印刷用PDFセット')");
      }

      var sampleButton = notice.querySelector('.paidInlineActions button.sub');
      if (sampleButton) sampleButton.textContent = '縮小サンプルPDF';
    });
  }

  function patchOutputCopy() {
    var normalButtons = Array.prototype.slice.call(document.querySelectorAll('button[onclick*="startFullSizePdf"]'));
    var tiledButtons = Array.prototype.slice.call(document.querySelectorAll('button[onclick*="startA4TiledPrint"]'));

    normalButtons.forEach(function (button) {
      setButtonTexts(
        button,
        '通常サイズPDF',
        '有料セットに含まれます / 実寸印刷',
        "runPaidExport('印刷用PDFセット', startFullSizePdf)"
      );
    });

    tiledButtons.forEach(function (button) {
      setButtonTexts(
        button,
        'A4分割印刷PDF',
        '有料セットに含まれます / A4貼り合わせ',
        "runPaidExport('印刷用PDFセット', startA4TiledPrint)"
      );
    });

    Array.prototype.slice.call(document.querySelectorAll('.outputMainPanel, .lowerOutputPanel')).forEach(function (panel) {
      upsertPaidSetSummary(panel);
      patchNotes(panel);
    });

    patchPaidNotice();
  }

  function installOutputCopyObserver() {
    var scheduled = false;
    function schedulePatch() {
      if (scheduled) return;
      scheduled = true;
      window.setTimeout(function () {
        scheduled = false;
        patchOutputCopy();
      }, 0);
    }

    schedulePatch();
    document.addEventListener('click', function () {
      window.setTimeout(schedulePatch, 0);
    }, true);

    if (window.MutationObserver) {
      var observer = new MutationObserver(schedulePatch);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  function boot() {
    runMiniIntro();
    installOutputCopyObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
