/*
 * KATAPATA site-only mini intro: original-logo version
 * + site output-copy patch
 * - Uses the existing KATAPATA opening logo letters.
 * - Hides pencil/canvas and ENTER button.
 * - Auto-enters the measurement screen after a short logo display.
 * - Clarifies paid output as one "printable PDF set" and combines normal-size + A4 tiled buttons into one paid-set button.
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
      '.site-paid-combined-print-button {\n' +
      '  grid-column: 1 / -1 !important;\n' +
      '  text-align: left !important;\n' +
      '}\n' +
      '.site-print-original-hidden {\n' +
      '  display: none !important;\n' +
      '}\n' +
      '.site-print-choice-panel {\n' +
      '  grid-column: 1 / -1;\n' +
      '  margin-top: -2px;\n' +
      '  padding: 8px 9px;\n' +
      '  border-radius: 14px;\n' +
      '  background: #fff6e6;\n' +
      '  border: 1px solid #efd29a;\n' +
      '}\n' +
      '.site-print-choice-title {\n' +
      '  margin-bottom: 7px;\n' +
      '  color: #4b3a24;\n' +
      '  font-size: 10px;\n' +
      '  font-weight: 950;\n' +
      '}\n' +
      '.site-print-choice-actions {\n' +
      '  display: grid;\n' +
      '  grid-template-columns: 1fr 1fr;\n' +
      '  gap: 6px;\n' +
      '}\n' +
      '.site-print-choice-actions button {\n' +
      '  min-height: 30px;\n' +
      '  height: 30px;\n' +
      '  border-radius: 11px;\n' +
      '  font-size: 9.5px;\n' +
      '  padding: 0 8px;\n' +
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



  function normalizeButtonText(button) {
    return (button && button.textContent ? button.textContent : '').replace(/\s+/g, '');
  }

  function isSampleOutputButton(button) {
    var text = normalizeButtonText(button);
    return text.indexOf('縮小') !== -1 || text.indexOf('サンプル') !== -1;
  }

  function isNormalPrintButton(button) {
    if (!button || isSampleOutputButton(button)) return false;
    var text = normalizeButtonText(button);
    return text.indexOf('通常') !== -1 || text.indexOf('実寸') !== -1 || text.indexOf('原寸') !== -1;
  }

  function isTiledPrintButton(button) {
    if (!button || isSampleOutputButton(button)) return false;
    var text = normalizeButtonText(button);
    return text.indexOf('A4') !== -1 || text.indexOf('分割') !== -1 || text.indexOf('貼り合わせ') !== -1;
  }

  function looksLocked(button) {
    if (!button) return true;
    var text = normalizeButtonText(button);
    return button.classList.contains('locked') || text.indexOf('有料') !== -1 || text.indexOf('🔒') !== -1 || text.indexOf('購入') !== -1;
  }

  function showCombinedChoice(container, normalButton, tiledButton) {
    var existing = container.querySelector('.site-print-choice-panel');
    if (existing) {
      existing.remove();
      return;
    }

    var panel = document.createElement('div');
    panel.className = 'site-print-choice-panel';
    panel.innerHTML = '' +
      '<div class="site-print-choice-title">出力するPDFを選んでください</div>' +
      '<div class="site-print-choice-actions">' +
      '  <button type="button" class="site-print-choice-normal">通常サイズPDF</button>' +
      '  <button type="button" class="site-print-choice-tiled">A4分割印刷PDF</button>' +
      '</div>';

    var normalChoice = panel.querySelector('.site-print-choice-normal');
    var tiledChoice = panel.querySelector('.site-print-choice-tiled');
    if (normalChoice) normalChoice.addEventListener('click', function () { if (normalButton) normalButton.click(); });
    if (tiledChoice) tiledChoice.addEventListener('click', function () { if (tiledButton) tiledButton.click(); });

    var combined = container.querySelector('.site-paid-combined-print-button');
    if (combined && combined.nextSibling) {
      container.insertBefore(panel, combined.nextSibling);
    } else {
      container.appendChild(panel);
    }
  }

  function combinePaidPrintButtons() {
    Array.prototype.slice.call(document.querySelectorAll('.printActions')).forEach(function (container) {
      if (container.querySelector('.site-paid-combined-print-button')) return;

      var buttons = Array.prototype.slice.call(container.querySelectorAll('button'));
      var normalButton = buttons.find(isNormalPrintButton);
      var tiledButton = buttons.find(isTiledPrintButton);
      if (!normalButton || !tiledButton || normalButton === tiledButton) return;

      normalButton.classList.add('site-print-original-hidden');
      tiledButton.classList.add('site-print-original-hidden');
      normalButton.style.display = 'none';
      tiledButton.style.display = 'none';
      normalButton.setAttribute('aria-hidden', 'true');
      tiledButton.setAttribute('aria-hidden', 'true');
      normalButton.tabIndex = -1;
      tiledButton.tabIndex = -1;

      var combined = document.createElement('button');
      combined.type = 'button';
      combined.className = 'printAction paid locked site-paid-combined-print-button';
      combined.innerHTML = '<strong>通常サイズ・A4分割印刷PDF</strong><small>有料：印刷用PDFセット</small>';
      combined.addEventListener('click', function () {
        if (typeof window.purchasePaidExport === 'function' && looksLocked(normalButton) && looksLocked(tiledButton)) {
          try { window.purchasePaidExport('印刷用PDFセット'); return; } catch (e) {}
        }
        if (looksLocked(normalButton) || looksLocked(tiledButton)) {
          if (normalButton) normalButton.click();
          return;
        }
        showCombinedChoice(container, normalButton, tiledButton);
      });

      container.insertBefore(combined, normalButton);
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
    combinePaidPrintButtons();
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


/*
 * KATAPATA site-only bottom-output aggregation patch
 * - Keeps bottom/skirt/pants PDF controls out of the bottom editing stage.
 * - Collects those controls and shows them in the final Output stage.
 * - Does not touch KATAPATA's original drafting/export functions.
 */
(function () {
  'use strict';

  var STORE = {
    actions: [],
    harvesting: false,
    autoHarvestTried: false,
    lastRenderKey: ''
  };

  function normalize(text) {
    return (text || '').replace(/\s+/g, '').trim();
  }

  function readable(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function injectBottomOutputStyle() {
    if (document.getElementById('katapataSiteBottomOutputStyle')) return;
    var css = '' +
      '.site-lower-pdf-hidden { display: none !important; }\n' +
      '.site-lower-pdf-note { border: 1px solid #eadcc8 !important; background: #fff8ef !important; }\n' +
      '.site-lower-pdf-note strong { display:block; margin-bottom:4px; color:#2f2923; font-size:12px; font-weight:950; }\n' +
      '.site-lower-pdf-note p { margin:0; color:#6d4b23; font-size:10px; line-height:1.45; font-weight:800; }\n' +
      '.site-lower-pdf-note button { margin-top:8px; min-height:30px; height:30px; border-radius:12px; padding:0 10px; font-size:10px; }\n' +
      '.site-bottom-output-panel { border: 1px solid #eadcc8 !important; background: linear-gradient(180deg,#fffdf9 0%,#fff8ef 100%) !important; }\n' +
      '.site-bottom-output-panel h2 { display:flex; align-items:center; justify-content:space-between; gap:8px; }\n' +
      '.site-bottom-output-badge { display:inline-flex; align-items:center; justify-content:center; padding:2px 7px; border-radius:999px; background:#171717; color:#fff; font-size:8.5px; font-weight:950; letter-spacing:.04em; }\n' +
      '.site-bottom-output-lead { margin:0 0 8px; color:#6d4b23; font-size:9.5px; line-height:1.45; font-weight:800; }\n' +
      '.site-bottom-output-actions { display:grid; grid-template-columns:1fr; gap:7px; }\n' +
      '.site-bottom-output-actions button { min-height:42px; height:auto; border-radius:14px; padding:8px 10px; text-align:left; }\n' +
      '.site-bottom-output-actions button strong { display:block; font-size:11.5px; line-height:1.25; margin-bottom:2px; font-weight:950; }\n' +
      '.site-bottom-output-actions button small { display:block; font-size:9px; line-height:1.35; opacity:.86; font-weight:750; }\n' +
      '.site-bottom-choice-panel { margin-top:7px; padding:8px 9px; border-radius:14px; background:#fff6e6; border:1px solid #efd29a; }\n' +
      '.site-bottom-choice-title { margin-bottom:7px; color:#4b3a24; font-size:10px; font-weight:950; }\n' +
      '.site-bottom-choice-actions { display:grid; grid-template-columns:1fr 1fr; gap:6px; }\n' +
      '.site-bottom-choice-actions button { min-height:30px; height:30px; border-radius:11px; font-size:9.5px; padding:0 8px; text-align:center; }\n' +
      '.site-bottom-output-empty { padding:8px 9px; border-radius:13px; border:1px dashed #e4d8c7; background:#fbf7ef; color:#746452; font-size:9.5px; line-height:1.45; font-weight:800; }\n' +
      'body.site-lower-harvesting .main { opacity:.18; pointer-events:none; transition:opacity .12s ease; }\n' +
      '@media (max-width:560px) { .site-bottom-choice-actions { grid-template-columns:1fr; } }\n';
    var style = document.createElement('style');
    style.id = 'katapataSiteBottomOutputStyle';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getMainStage() {
    var main = document.querySelector('.main');
    return main ? (main.getAttribute('data-stage') || '') : '';
  }

  function getActiveStageText() {
    var active = document.querySelector('.stage.active');
    return active ? normalize(active.textContent) : '';
  }

  function isLowerStage() {
    var stage = getMainStage();
    if (stage === 'lower' || stage === 'bottom' || stage === 'bottoms') return true;
    return getActiveStageText().indexOf('ボトムス') !== -1;
  }

  function isOutputStage() {
    var stage = getMainStage();
    if (stage === 'output') return true;
    return getActiveStageText().indexOf('出力') !== -1;
  }

  function clickStage(stageName) {
    var btn = document.querySelector('.stage[data-stage="' + stageName + '"]');
    if (btn && typeof btn.click === 'function') {
      btn.click();
      return true;
    }
    if (typeof window.setStage === 'function') {
      try { window.setStage(stageName); return true; } catch (e) {}
    }
    return false;
  }

  function buttonKey(button) {
    if (!button) return '';
    var text = normalize(button.textContent);
    var onclick = button.getAttribute('onclick') || '';
    var parentText = normalize((button.closest('.panel') || button.parentElement || button).textContent || '');
    return [text, onclick, parentText.slice(0, 80)].join('|');
  }

  function inferGarment(text, context) {
    var t = text + context;
    if (t.indexOf('パンツ') !== -1 || /pants/i.test(t)) return 'パンツ';
    if (t.indexOf('スカート') !== -1 || /skirt/i.test(t)) return 'スカート';
    return 'ボトムス';
  }

  function inferKind(text, context) {
    var t = text + context;
    if (t.indexOf('縮小') !== -1 || t.indexOf('サンプル') !== -1 || t.indexOf('無料') !== -1) return 'sample';
    if (t.indexOf('A4') !== -1 || t.indexOf('分割') !== -1 || t.indexOf('貼り合わせ') !== -1) return 'tiled';
    if (t.indexOf('通常') !== -1 || t.indexOf('実寸') !== -1 || t.indexOf('原寸') !== -1) return 'normal';
    if (t.indexOf('有料') !== -1 || t.indexOf('印刷用') !== -1 || t.indexOf('PDFセット') !== -1) return 'paid';
    return 'generic';
  }

  function kindLabel(kind) {
    if (kind === 'sample') return '縮小サンプルPDF';
    if (kind === 'tiled') return 'A4分割印刷PDF';
    if (kind === 'normal') return '通常サイズPDF';
    if (kind === 'paid') return '印刷用PDFセット';
    return 'PDF出力';
  }

  function isStageOrNavButton(button) {
    if (!button) return true;
    if (button.classList.contains('stage') || button.dataset.stage) return true;
    if (button.id === 'resetBtn' || button.id === 'openingEnter') return true;
    if (button.classList.contains('site-lower-output-link')) return true;
    if (button.classList.contains('site-bottom-output-trigger')) return true;
    if (button.closest('.appStagebar') || button.closest('.openingOverlay')) return true;
    return false;
  }

  function looksLikeLowerPdfButton(button) {
    if (isStageOrNavButton(button)) return false;
    var text = normalize(button.textContent);
    if (!text) return false;
    if (text.indexOf('購入ページへ') !== -1 && text.indexOf('PDF') === -1 && text.indexOf('印刷') === -1) return false;
    if (text.indexOf('戻る') !== -1 || text.indexOf('リセット') !== -1 || text.indexOf('初期化') !== -1) return false;

    var contextEl = button.closest('.panel') || button.parentElement || button;
    var context = normalize(contextEl.textContent || '');
    var lowerish = isLowerStage() || context.indexOf('ボトムス') !== -1 || context.indexOf('スカート') !== -1 || context.indexOf('パンツ') !== -1 || /skirt|pants/i.test(context);
    if (!lowerish) return false;

    return /PDF|印刷|出力|A4|分割|通常|実寸|原寸|縮小|サンプル|ダウンロード/.test(text + context);
  }

  function upsertActionFromButton(button) {
    var key = buttonKey(button);
    if (!key) return;

    var text = normalize(button.textContent);
    var context = normalize(((button.closest('.panel') || button.parentElement || button).textContent) || '');
    var garment = inferGarment(text, context);
    var kind = inferKind(text, context);
    var label = garment + ' ' + kindLabel(kind);

    var existing = STORE.actions.find(function (action) { return action.key === key; });
    if (existing) {
      existing.button = button;
      return;
    }

    button.setAttribute('data-site-lower-pdf-key', String(STORE.actions.length + 1));
    STORE.actions.push({
      key: key,
      button: button,
      text: readable(button.textContent) || label,
      label: label,
      garment: garment,
      kind: kind
    });
  }

  function hideLowerPdfButton(button) {
    if (!button || button.classList.contains('site-lower-pdf-hidden')) return;
    button.classList.add('site-lower-pdf-hidden');
    button.setAttribute('aria-hidden', 'true');
    button.tabIndex = -1;
  }

  function insertLowerNotice() {
    if (!isLowerStage()) return;
    var side = document.querySelector('.side');
    if (!side || side.querySelector('.site-lower-pdf-note')) return;

    var note = document.createElement('div');
    note.className = 'panel site-lower-pdf-note';
    note.innerHTML = '<strong>PDF出力は最後の「出力」にまとめました</strong><p>ボトムスのPDFも、最終確認後に出力画面からダウンロードできます。</p><button type="button" class="site-lower-output-link">出力画面へ進む</button>';
    var link = note.querySelector('.site-lower-output-link');
    if (link) link.addEventListener('click', function () { clickStage('output'); });
    side.insertBefore(note, side.firstChild);
  }

  function harvestLowerPdfButtons() {
    if (!isLowerStage()) return false;
    injectBottomOutputStyle();

    var found = false;
    var scope = document.querySelector('.side') || document.body;
    Array.prototype.slice.call(scope.querySelectorAll('button')).forEach(function (button) {
      if (!looksLikeLowerPdfButton(button)) return;
      upsertActionFromButton(button);
      hideLowerPdfButton(button);
      found = true;
    });

    insertLowerNotice();
    return found;
  }

  function actionSortValue(action) {
    var garmentWeight = action.garment === 'スカート' ? 1 : action.garment === 'パンツ' ? 2 : 3;
    var kindWeight = action.kind === 'sample' ? 1 : action.kind === 'normal' ? 2 : action.kind === 'tiled' ? 3 : action.kind === 'paid' ? 4 : 5;
    return garmentWeight * 10 + kindWeight;
  }

  function uniqueActions(actions) {
    var seen = Object.create(null);
    return actions.filter(function (action) {
      var key = action.label + '|' + action.kind + '|' + action.garment;
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    }).sort(function (a, b) { return actionSortValue(a) - actionSortValue(b); });
  }

  function triggerLowerAction(action) {
    if (!action) return;
    var live = Array.prototype.slice.call(document.querySelectorAll('button')).find(function (button) {
      return buttonKey(button) === action.key;
    });
    var target = live || action.button;
    if (target && typeof target.click === 'function') {
      try { target.click(); return; } catch (e) {}
    }

    var panel = document.querySelector('.site-bottom-output-panel');
    var msg = panel && panel.querySelector('.site-bottom-output-empty');
    if (msg) msg.textContent = 'このPDFボタンを呼び出せませんでした。いったんボトムス画面を開いてから、もう一度お試しください。';
  }

  function toggleChoicePanel(container, actions, title) {
    var existing = container.querySelector('.site-bottom-choice-panel');
    if (existing) {
      existing.remove();
      return;
    }

    var panel = document.createElement('div');
    panel.className = 'site-bottom-choice-panel';
    panel.innerHTML = '<div class="site-bottom-choice-title"></div><div class="site-bottom-choice-actions"></div>';
    panel.querySelector('.site-bottom-choice-title').textContent = title || '出力するPDFを選んでください';
    var actionsBox = panel.querySelector('.site-bottom-choice-actions');

    actions.forEach(function (action) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = action.label;
      button.addEventListener('click', function () { triggerLowerAction(action); });
      actionsBox.appendChild(button);
    });

    container.appendChild(panel);
  }

  function makeProxyButton(container, className, strongText, smallText, actions, choiceTitle) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'printAction site-bottom-output-trigger ' + (className || '');
    button.innerHTML = '<strong></strong><small></small>';
    button.querySelector('strong').textContent = strongText;
    button.querySelector('small').textContent = smallText;
    button.addEventListener('click', function () {
      if (actions.length === 1) {
        triggerLowerAction(actions[0]);
      } else {
        toggleChoicePanel(container, actions, choiceTitle);
      }
    });
    container.appendChild(button);
  }

  function renderBottomOutputPanel() {
    if (!isOutputStage()) return;
    injectBottomOutputStyle();

    var side = document.querySelector('.side');
    if (!side) return;

    var existing = side.querySelector('.site-bottom-output-panel');
    if (!existing) {
      existing = document.createElement('div');
      existing.className = 'panel site-bottom-output-panel';
      side.appendChild(existing);
    }

    var actions = uniqueActions(STORE.actions);
    var key = actions.map(function (a) { return a.label + a.key; }).join('||');
    if (STORE.lastRenderKey === key && existing.getAttribute('data-rendered') === 'true') return;
    STORE.lastRenderKey = key;
    existing.setAttribute('data-rendered', 'true');

    existing.innerHTML = '<h2>ボトムスPDF <span class="site-bottom-output-badge">OUTPUT</span></h2><p class="site-bottom-output-lead">スカート・パンツのPDF出力は、この出力画面にまとめています。</p><div class="site-bottom-output-actions"></div>';
    var actionsBox = existing.querySelector('.site-bottom-output-actions');

    if (!actions.length) {
      var empty = document.createElement('div');
      empty.className = 'site-bottom-output-empty';
      empty.textContent = 'ボトムスPDFが見つかりませんでした。ボトムス画面で内容を確認すると、ここに出力ボタンが表示されます。';
      actionsBox.appendChild(empty);
      return;
    }

    var sampleActions = actions.filter(function (a) { return a.kind === 'sample'; });
    var paidActions = actions.filter(function (a) { return a.kind === 'normal' || a.kind === 'tiled' || a.kind === 'paid'; });
    var otherActions = actions.filter(function (a) { return a.kind === 'generic'; });

    if (sampleActions.length) {
      makeProxyButton(actionsBox, 'freeMain', 'ボトムス縮小サンプルPDF', '無料：形や配置の確認用', sampleActions, '出力する縮小サンプルを選んでください');
    }

    if (paidActions.length) {
      makeProxyButton(actionsBox, 'paid locked', 'ボトムス 通常サイズ・A4分割印刷PDF', '有料：印刷用PDFセット', paidActions, '出力する印刷用PDFを選んでください');
    }

    if (otherActions.length) {
      makeProxyButton(actionsBox, 'sub', 'その他のボトムスPDF', 'ボトムス画面のPDF出力', otherActions, '出力するPDFを選んでください');
    }
  }

  function attemptAutoHarvestForOutput() {
    if (!isOutputStage()) return;
    if (STORE.actions.length || STORE.harvesting || STORE.autoHarvestTried) return;

    var lowerButton = document.querySelector('.stage[data-stage="lower"]');
    var outputButton = document.querySelector('.stage[data-stage="output"]');
    if (!lowerButton || !outputButton) return;

    STORE.autoHarvestTried = true;
    STORE.harvesting = true;
    document.body.classList.add('site-lower-harvesting');

    lowerButton.click();
    window.setTimeout(function () {
      harvestLowerPdfButtons();
      outputButton.click();
      window.setTimeout(function () {
        STORE.harvesting = false;
        document.body.classList.remove('site-lower-harvesting');
        renderBottomOutputPanel();
      }, 90);
    }, 80);
  }

  function patchBottomPdfFlow() {
    if (STORE.harvesting) return;
    if (isLowerStage()) {
      harvestLowerPdfButtons();
    }
    if (isOutputStage()) {
      attemptAutoHarvestForOutput();
      renderBottomOutputPanel();
    }
  }

  function installBottomOutputObserver() {
    var scheduled = false;
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      window.setTimeout(function () {
        scheduled = false;
        patchBottomPdfFlow();
      }, 0);
    }

    schedule();
    document.addEventListener('click', function () {
      window.setTimeout(schedule, 0);
    }, true);

    if (window.MutationObserver) {
      var observer = new MutationObserver(schedule);
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'data-stage'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installBottomOutputObserver, { once: true });
  } else {
    installBottomOutputObserver();
  }
})();
