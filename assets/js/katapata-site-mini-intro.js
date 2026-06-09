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
      '/* iPad / tablet portrait: use the full screen width inside the embedded KATAPATA app. */\n' +
      '@media (min-width: 700px) and (max-width: 1100px) and (orientation: portrait) {\n' +
      '  html, body { width: 100% !important; max-width: none !important; overflow-x: hidden !important; }\n' +
      '  .wrap { width: 100vw !important; max-width: none !important; margin: 0 !important; padding: 8px !important; box-sizing: border-box !important; }\n' +
      '  .card { width: 100% !important; max-width: none !important; border-radius: 16px !important; }\n' +
      '  .top, .appTop { padding: 8px 10px !important; gap: 8px !important; }\n' +
      '  .appTopMain { width: 100% !important; grid-template-columns: 1fr !important; gap: 8px !important; }\n' +
      '  .appBrand h1 { font-size: 15px !important; }\n' +
      '  .appStagebar { width: 100% !important; grid-template-columns: repeat(5, minmax(0, 1fr)) !important; gap: 5px !important; }\n' +
      '  .appStagebar .stage { min-width: 0 !important; height: 28px !important; padding: 0 4px !important; font-size: 9.5px !important; }\n' +
      '  .appReset { height: 28px !important; }\n' +
      '  .main { width: 100% !important; max-width: none !important; padding: 8px !important; gap: 8px !important; box-sizing: border-box !important; }\n' +
      '  .main[data-stage], .main[data-stage="measure"], .main[data-stage="adjust"], .main[data-stage="dart"], .main[data-stage="confirm"], .main[data-stage="output"] { grid-template-columns: 1fr !important; }\n' +
      '  .canvas, .main[data-stage="adjust"] .canvas, .main[data-stage="dart"] .canvas, .main[data-stage="confirm"] .canvas, .main[data-stage="output"] .canvas { width: 100% !important; max-width: none !important; height: min(60svh, 700px) !important; min-height: 520px !important; border-radius: 14px !important; }\n' +
      '  .main[data-stage="measure"] .canvas { height: auto !important; min-height: min(62svh, 700px) !important; }\n' +
      '  .main[data-stage="measure"] .measureCanvas { width: 100% !important; padding: 8px !important; box-sizing: border-box !important; }\n' +
      '  .measureHero { width: 100% !important; max-width: none !important; }\n' +
      '  .measureHeroTitle { padding: 5px 10px !important; }\n' +
      '  .measureFigureGrid { width: 100% !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 8px !important; justify-items: center !important; align-items: end !important; }\n' +
      '  .torsoWrap { width: min(31vw, 252px) !important; height: auto !important; aspect-ratio: 594 / 1122 !important; }\n' +
      '  .torsoWrap.side { width: min(18vw, 146px) !important; height: auto !important; aspect-ratio: 334 / 1118 !important; }\n' +
      '  .side { width: 100% !important; max-width: none !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 8px !important; }\n' +
      '  .main[data-stage="measure"] .side { grid-template-columns: 1fr !important; }\n' +
      '  .panel { padding: 10px 11px !important; border-radius: 14px !important; }\n' +
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


/*
 * KATAPATA site-only output panel cleanup: paid direct-download buttons removed.
 * Final rule:
 * - Free: sample PDF only.
 * - Paid: purchase flow only. Do not expose normal-size / A4 split direct-download buttons before purchase.
 */
(function () {
  'use strict';

  function textOf(el) {
    return (el && (el.innerText || el.textContent) || '').replace(/\s+/g, ' ').trim();
  }

  function makeEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
  }

  function findButton(buttons, patterns, rejectPatterns) {
    rejectPatterns = rejectPatterns || [];
    return buttons.find(function (btn) {
      var t = textOf(btn);
      if (rejectPatterns.some(function (p) { return p.test(t); })) return false;
      return patterns.some(function (p) { return p.test(t); });
    }) || null;
  }

  function detectOutputLanguage(raw) {
    var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    var bodyText = (document.body && (document.body.innerText || document.body.textContent) || '');
    var s = [htmlLang, raw || '', bodyText || '', location.href || ''].join(' ');
    if (/\blang=en\b|[?&]lang=en\b|\/en(?:\/|$)/i.test(s)) return 'en';
    if (/\b(Output|PDF Output|Output target|Category|Free|Paid|Print-ready|Purchase|Download sample|Tops|Bottoms|With sleeve|No sleeve)\b/i.test(s)) return 'en';
    return 'ja';
  }

  function labelFor(lang, key) {
    var dict = {
      ja: {
        outputTitle: 'PDF出力',
        freeTitle: '無料：縮小サンプルPDF',
        freeDesc: '確認用です。実寸ではありません。',
        sampleButton: '縮小サンプルを出力',
        sampleMissing: '縮小サンプルPDFのボタンが見つかりませんでした。',
        paidTitle: '有料：印刷用PDF',
        paidDesc: '有料出力では、通常サイズPDFとA4分割印刷PDFをセットで使えます。トップスは前・後・袖の3点セット800円、ボトムスはスカートとパンツ、各400円を予定しています。',
        purchaseButton: '印刷用PDFを購入',
        paidMissing: '購入後に利用できます。テスト時以外は直接ダウンロードボタンを表示しません。',
        backButton: '確定に戻る',
        defaultTarget: '選択中の製図'
      },
      en: {
        outputTitle: 'PDF Output',
        freeTitle: 'Free: Sample PDF',
        freeDesc: 'For checking only. Not actual size.',
        sampleButton: 'Download sample PDF',
        sampleMissing: 'The sample PDF button was not found.',
        paidTitle: 'Paid: Print-ready PDF',
        paidDesc: 'Paid output includes both the full-size PDF and the A4 tiled PDF. Tops is an 800 yen set including front, back, and sleeve. Skirt and pants are 400 yen each.',
        purchaseButton: 'Purchase print-ready PDF',
        paidMissing: 'Available after purchase. Direct download buttons are hidden outside test mode.',
        backButton: 'Back to confirmation',
        defaultTarget: 'Selected pattern'
      }
    };
    return (dict[lang] || dict.ja)[key] || dict.ja[key] || '';
  }

  function translatePill(value, lang) {
    if (lang !== 'en') return value;
    var map = {
      'トップス': 'Tops',
      '全体': 'Tops',
      '前': 'Front',
      '後': 'Back',
      '袖': 'Sleeve',
      '袖あり': 'With sleeve',
      '袖なし': 'No sleeve',
      'スカート': 'Skirt',
      'パンツ': 'Pants',
      '選択中の製図': 'Selected pattern'
    };
    return map[value] || value;
  }

  function parseSummary(raw, lang) {
    var lines = (raw || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
    var target = '';
    var kind = '';
    for (var i = 0; i < lines.length; i++) {
      if ((lines[i] === '出力対象' || /^Output target$/i.test(lines[i])) && lines[i + 1]) target = lines[i + 1];
      if ((lines[i] === '区分' || /^Category$/i.test(lines[i])) && lines[i + 1]) kind = lines[i + 1];
    }
    if (!target) {
      var m = (raw || '').match(/(?:出力対象|Output target)\s*([^\n]+)/i);
      if (m) target = m[1].trim();
    }
    if (!kind) {
      var k = (raw || '').match(/(?:区分|Category)\s*([^\n]+)/i);
      if (k) kind = k[1].trim();
    }
    return { target: translatePill(target || labelFor(lang, 'defaultTarget'), lang), kind: translatePill(kind || '', lang) };
  }

  function injectOutputStyle() {
    if (document.getElementById('katapataOutputFinalStyle')) return;
    var css = '' +
      '.katapata-output-final{display:grid;gap:10px;align-content:start;}' +
      '.katapata-output-final .kop-panel{background:#fffdf8;border:1px solid #eee6da;border-radius:16px;padding:12px 13px;display:grid;gap:9px;}' +
      '.katapata-output-final .kop-title{font-size:13px;font-weight:950;color:#2f2a24;line-height:1.2;}' +
      '.katapata-output-final .kop-target{display:flex;flex-wrap:wrap;gap:6px;align-items:center;}' +
      '.katapata-output-final .kop-pill{display:inline-flex;align-items:center;justify-content:center;border:1px solid #e2d8ca;background:#fbf8f2;border-radius:999px;padding:4px 9px;font-size:10px;font-weight:900;color:#5d5247;}' +
      '.katapata-output-final .kop-section{display:grid;gap:7px;padding:9px;border:1px solid #eadfce;background:#fffaf2;border-radius:14px;}' +
      '.katapata-output-final .kop-section.free{background:#f6faf4;border-color:#d6ead0;}' +
      '.katapata-output-final .kop-section.paid{background:#fff7ea;border-color:#ead9b7;}' +
      '.katapata-output-final .kop-section-title{font-size:11px;font-weight:950;color:#3b342c;line-height:1.25;}' +
      '.katapata-output-final .kop-desc{font-size:9.8px;font-weight:760;line-height:1.45;color:#6b5d4d;margin:0;}' +
      '.katapata-output-final .kop-actions{display:grid;gap:6px;}' +
      '.katapata-output-final button{width:100%;min-height:34px;border-radius:13px;font-size:10.5px;text-align:center;}' +
      '.katapata-output-final .kop-empty{font-size:10px;font-weight:800;line-height:1.45;color:#7b6b5a;background:#fbf8f2;border:1px dashed #e4ded4;border-radius:13px;padding:8px 9px;}' +
      '@media (max-width:560px){.katapata-output-final .kop-panel{padding:10px 11px;border-radius:15px}.katapata-output-final button{min-height:32px;font-size:10px}}';
    var style = document.createElement('style');
    style.id = 'katapataOutputFinalStyle';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function hasDirectPaidButtons(side) {
    if (!side) return false;
    return Array.prototype.some.call(side.querySelectorAll('button'), function (btn) {
      var t = textOf(btn);
      return /通常サイズPDF|A4分割印刷PDF|通常サイズ・A4分割印刷PDF/.test(t) && !/購入ページ/.test(t);
    });
  }

  function simplifyOutputPanel() {
    var main = document.querySelector('.main[data-stage="output"]');
    if (!main) return;
    var side = main.querySelector('.side');
    if (!side) return;

    var raw = side.innerText || '';
    if (!/縮小サンプル|通常サイズ|A4|印刷|PDF|購入/.test(raw)) return;

    var lang = detectOutputLanguage(raw);
    var existing = side.querySelector('.katapata-output-final');
    if (existing && !hasDirectPaidButtons(side)) {
      var existingText = textOf(existing);
      var needsEnglishRewrite = lang === 'en' && /有料|無料|縮小|印刷用PDF|確定に戻る/.test(existingText);
      var needsJapaneseRewrite = lang !== 'en' && /\b(Paid|Free|Print-ready|Download sample|Back to confirmation)\b/i.test(existingText);
      if (!needsEnglishRewrite && !needsJapaneseRewrite) return;
    }

    injectOutputStyle();

    var buttons = Array.prototype.slice.call(side.querySelectorAll('button'));
    var sampleBtn = findButton(buttons, [/縮小サンプル/, /サンプルPDF/, /sample pdf/i, /download sample/i]);
    var purchaseBtn = findButton(
      buttons,
      [/購入ページへ/, /購入ページ/, /^\s*購入\s*$/, /purchase/i, /checkout/i, /buy/i],
      [/通常サイズPDF/, /A4分割印刷PDF/, /通常サイズ・A4分割印刷PDF/, /full-size pdf/i, /a4 tiled pdf/i]
    );
    var backBtn = findButton(buttons, [/戻る.*確定/, /確定へ戻る/, /^\s*戻る\s*$/, /^\s*確定\s*$/, /back.*confirm/i, /confirmation/i]);
    var summary = parseSummary(raw, lang);

    var compact = makeEl('div', 'katapata-output-final');
    var panel = makeEl('div', 'kop-panel');
    compact.appendChild(panel);

    panel.appendChild(makeEl('div', 'kop-title', labelFor(lang, 'outputTitle')));
    var target = makeEl('div', 'kop-target');
    target.appendChild(makeEl('span', 'kop-pill', summary.target));
    if (summary.kind) target.appendChild(makeEl('span', 'kop-pill', summary.kind));
    panel.appendChild(target);

    var free = makeEl('section', 'kop-section free');
    free.appendChild(makeEl('div', 'kop-section-title', labelFor(lang, 'freeTitle')));
    free.appendChild(makeEl('p', 'kop-desc', labelFor(lang, 'freeDesc')));
    var freeActions = makeEl('div', 'kop-actions');
    if (sampleBtn) {
      sampleBtn.textContent = labelFor(lang, 'sampleButton');
      freeActions.appendChild(sampleBtn);
    }
    else freeActions.appendChild(makeEl('div', 'kop-empty', labelFor(lang, 'sampleMissing')));
    free.appendChild(freeActions);
    panel.appendChild(free);

    var paid = makeEl('section', 'kop-section paid');
    paid.appendChild(makeEl('div', 'kop-section-title', labelFor(lang, 'paidTitle')));
    paid.appendChild(makeEl('p', 'kop-desc', labelFor(lang, 'paidDesc')));
    var paidActions = makeEl('div', 'kop-actions');
    if (purchaseBtn) {
      purchaseBtn.textContent = labelFor(lang, 'purchaseButton');
      paidActions.appendChild(purchaseBtn);
    }
    else paidActions.appendChild(makeEl('div', 'kop-empty', labelFor(lang, 'paidMissing')));
    paid.appendChild(paidActions);
    panel.appendChild(paid);

    if (backBtn) {
      var back = makeEl('div', 'kop-actions');
      backBtn.textContent = labelFor(lang, 'backButton');
      back.appendChild(backBtn);
      panel.appendChild(back);
    }

    side.setAttribute('data-katapata-output-original-text', raw.slice(0, 1200));
    side.innerHTML = '';
    side.appendChild(compact);
  }

  function scheduleSimplify() {
    window.setTimeout(simplifyOutputPanel, 0);
    window.setTimeout(simplifyOutputPanel, 80);
    window.setTimeout(simplifyOutputPanel, 240);
    window.setTimeout(simplifyOutputPanel, 700);
  }

  function startOutputObserver() {
    scheduleSimplify();
    document.addEventListener('click', scheduleSimplify, true);
    var obs = new MutationObserver(scheduleSimplify);
    obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-stage', 'class'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startOutputObserver, { once: true });
  } else {
    startOutputObserver();
  }
})();

/*
 * KATAPATA site-only iPad portrait readability fix.
 * Keeps the existing mini intro/output cleanup, then overrides only tablet portrait sizing.
 */
(function () {
  'use strict';

  function injectIpadReadableStyle() {
    if (document.getElementById('katapataIpadReadableTorsoStyle')) return;

    var css = '' +
      '@media (min-width: 700px) and (max-width: 1100px) and (orientation: portrait) {\n' +
      '  /* iPad portrait: stop the measure screen from becoming a huge empty frame. */\n' +
      '  .main[data-stage="measure"] {\n' +
      '    padding: 8px !important;\n' +
      '    gap: 8px !important;\n' +
      '  }\n' +
      '  .main[data-stage="measure"] .canvas {\n' +
      '    height: auto !important;\n' +
      '    min-height: 0 !important;\n' +
      '    padding: 0 !important;\n' +
      '    align-items: flex-start !important;\n' +
      '  }\n' +
      '  .main[data-stage="measure"] .measureCanvas {\n' +
      '    min-height: 0 !important;\n' +
      '    padding: 8px 10px 10px !important;\n' +
      '    align-items: flex-start !important;\n' +
      '  }\n' +
      '  .measureHero {\n' +
      '    gap: 8px !important;\n' +
      '  }\n' +
      '  .measureFigureGrid {\n' +
      '    gap: 10px !important;\n' +
      '    align-items: end !important;\n' +
      '  }\n' +
      '  .torsoWrap {\n' +
      '    width: min(40vw, 320px) !important;\n' +
      '    height: auto !important;\n' +
      '    aspect-ratio: 594 / 1122 !important;\n' +
      '  }\n' +
      '  .torsoWrap.side {\n' +
      '    width: min(23vw, 186px) !important;\n' +
      '    height: auto !important;\n' +
      '    aspect-ratio: 334 / 1118 !important;\n' +
      '  }\n' +
      '  .measureGuide text {\n' +
      '    font-size: 40px !important;\n' +
      '    fill: #171717 !important;\n' +
      '    opacity: 1 !important;\n' +
      '    stroke: rgba(255,255,255,.92) !important;\n' +
      '    stroke-width: 8px !important;\n' +
      '    paint-order: stroke !important;\n' +
      '    font-weight: 950 !important;\n' +
      '  }\n' +
      '  .measureGuide line, .measureGuide path {\n' +
      '    stroke: #171717 !important;\n' +
      '    stroke-width: 8px !important;\n' +
      '    opacity: 1 !important;\n' +
      '  }\n' +
      '  .frontSleeveGuide line { stroke-width: 7px !important; }\n' +
      '  /* iPad portrait: make UI text readable, not tiny/thin. */\n' +
      '  .appTop { padding: 10px 12px !important; }\n' +
      '  .appBrand h1 { font-size: 18px !important; letter-spacing: .11em !important; }\n' +
      '  .appBrand .note, .note {\n' +
      '    font-size: 10.5px !important;\n' +
      '    line-height: 1.35 !important;\n' +
      '    color: #5d5247 !important;\n' +
      '    font-weight: 850 !important;\n' +
      '  }\n' +
      '  .appStagebar { gap: 6px !important; }\n' +
      '  .appStagebar .stage, .stage, .parttabs .stage {\n' +
      '    height: 34px !important;\n' +
      '    min-height: 34px !important;\n' +
      '    font-size: 12px !important;\n' +
      '    font-weight: 950 !important;\n' +
      '    color: #4f463d !important;\n' +
      '  }\n' +
      '  .stage.active, .appStagebar .stage.active, .parttabs .stage.active {\n' +
      '    color: #fffdf8 !important;\n' +
      '  }\n' +
      '  .panel { padding: 12px 13px !important; }\n' +
      '  .panel h2, .panelTitleRow h2 {\n' +
      '    font-size: 15px !important;\n' +
      '    line-height: 1.25 !important;\n' +
      '    color: #241f1b !important;\n' +
      '    font-weight: 950 !important;\n' +
      '  }\n' +
      '  .stageCaption, .metricNote, .toolHint, .partIntro, .adjustMiniIntro, .dartMiniText, .confirmMiniText, .outputMiniText, .printNote, .measureMiniNote {\n' +
      '    font-size: 12.5px !important;\n' +
      '    line-height: 1.55 !important;\n' +
      '    color: #3f3932 !important;\n' +
      '    font-weight: 850 !important;\n' +
      '  }\n' +
      '  .measureHeroTitle { padding: 7px 12px !important; }\n' +
      '  .measureHeroTitle span {\n' +
      '    font-size: 9.5px !important;\n' +
      '    color: #5d5247 !important;\n' +
      '    font-weight: 950 !important;\n' +
      '  }\n' +
      '  .measureHeroTitle strong {\n' +
      '    font-size: 18px !important;\n' +
      '    color: #171717 !important;\n' +
      '  }\n' +
      '  .measureEntryTitle {\n' +
      '    font-size: 17px !important;\n' +
      '    line-height: 1.25 !important;\n' +
      '    color: #171717 !important;\n' +
      '  }\n' +
      '  .measureEntryLead {\n' +
      '    font-size: 11.5px !important;\n' +
      '    line-height: 1.45 !important;\n' +
      '    color: #4f463d !important;\n' +
      '    font-weight: 800 !important;\n' +
      '  }\n' +
      '  .measureEntryBadge {\n' +
      '    font-size: 10px !important;\n' +
      '    padding: 4px 10px !important;\n' +
      '  }\n' +
      '  .measureInputCard { padding: 8px 9px !important; border-radius: 13px !important; }\n' +
      '  .measureInputLabel strong {\n' +
      '    font-size: 12px !important;\n' +
      '    color: #241f1b !important;\n' +
      '    font-weight: 950 !important;\n' +
      '  }\n' +
      '  .measureInputHint {\n' +
      '    font-size: 9.5px !important;\n' +
      '    color: #6d6258 !important;\n' +
      '    font-weight: 850 !important;\n' +
      '  }\n' +
      '  .measureInputBox input {\n' +
      '    height: 34px !important;\n' +
      '    font-size: 18px !important;\n' +
      '    color: #171717 !important;\n' +
      '  }\n' +
      '  .measureInputBox .unit {\n' +
      '    font-size: 11px !important;\n' +
      '    color: #5d5247 !important;\n' +
      '  }\n' +
      '  .measureAction, button, .printAction {\n' +
      '    font-size: 12px !important;\n' +
      '    font-weight: 950 !important;\n' +
      '  }\n' +
      '}\n';

    var style = document.createElement('style');
    style.id = 'katapataIpadReadableTorsoStyle';
    style.textContent = css;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectIpadReadableStyle, { once: true });
  } else {
    injectIpadReadableStyle();
  }
})();

/*
 * KATAPATA English output badge fix.
 * Some locked print buttons use a CSS ::after badge whose original content is "有料".
 * When the output screen is in English, force that badge to read "Paid".
 */
(function () {
  'use strict';

  function looksEnglish() {
    var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    var bodyText = (document.body && (document.body.innerText || document.body.textContent) || '');
    var s = [htmlLang, bodyText || '', location.href || ''].join(' ');
    return /\blang=en\b|[?&]lang=en\b|\/en(?:\/|$)/i.test(s) || /\b(Full-size|A4 tiled|Print-ready|Output target|With sleeve|No sleeve|Purchase print-ready PDF|Sample PDF)\b/i.test(s);
  }

  function injectStyle() {
    if (document.getElementById('katapataEnglishPaidBadgeFixStyle')) return;
    var style = document.createElement('style');
    style.id = 'katapataEnglishPaidBadgeFixStyle';
    style.textContent = '' +
      'body.katapata-output-lang-en .printAction.locked::after,\n' +
      'body.katapata-output-lang-en .printAction.paid::after,\n' +
      'body.katapata-output-lang-en button.locked::after,\n' +
      'body.katapata-output-lang-en .locked::after { content: "Paid" !important; }\n';
    document.head.appendChild(style);
  }

  function replaceVisibleBadges() {
    if (!looksEnglish()) return;
    document.body.classList.add('katapata-output-lang-en');
    injectStyle();

    var nodes = document.querySelectorAll('.main[data-stage="output"] *');
    Array.prototype.forEach.call(nodes, function (el) {
      if (!el || el.children.length) return;
      var t = (el.textContent || '').trim();
      if (t === '有料') el.textContent = 'Paid';
      if (t === '無料') el.textContent = 'Free';
    });
  }

  function schedule() {
    window.setTimeout(replaceVisibleBadges, 0);
    window.setTimeout(replaceVisibleBadges, 80);
    window.setTimeout(replaceVisibleBadges, 240);
    window.setTimeout(replaceVisibleBadges, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }
  document.addEventListener('click', schedule, true);
  if (window.MutationObserver) {
    var observer = new MutationObserver(schedule);
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-stage', 'class'] });
  }
})();

/*
 * KATAPATA site-only tablet slim rail + measurement unit proxy.
 * - Removes the previous right-side workflow buttons.
 * - Shows only a slim, non-clickable vertical rail on tablet screens.
 * - Keeps Japanese/English controls in their original place.
 * - Adds only a cm/inch proxy switch near the measurement inputs.
 */
(function () {
  'use strict';

  var STYLE_ID = 'katapataTabletRailUnitStyle';
  var OLD_NAV_ID = 'katapataTabletStepbar';
  var RAIL_ID = 'katapataTabletSlimRail';
  var UNIT_BOX_ID = 'katapataMeasureUnitDock';

  function txt(el) {
    return (el && (el.innerText || el.textContent) || '').replace(/\s+/g, ' ').trim();
  }

  function looksEnglish() {
    var s = [
      (document.documentElement.getAttribute('lang') || ''),
      document.body ? txt(document.body) : '',
      location.href || ''
    ].join(' ');
    return /\blang=en\b|[?&]lang=en\b|\/en(?:\/|$)|\b(Input|Tops|Bottom|Darts|Confirm|Output|Measurements)\b/i.test(s);
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = '' +
      '/* Remove the previous tablet workflow button bar completely. */\n' +
      '#'+OLD_NAV_ID+'{display:none!important;visibility:hidden!important;pointer-events:none!important;}\n' +
      'body.katapata-tablet-workbar-ready{padding-right:0!important;}\n' +
      '/* Tablet-only slim visual rail. No buttons, no navigation. */\n' +
      '#'+RAIL_ID+'{display:none;}\n' +
      '@media (min-width:700px) and (max-width:1180px) and (pointer:coarse){\n' +
      '  #'+RAIL_ID+'{display:block;position:fixed;z-index:8400;right:9px;top:50%;transform:translateY(-50%);width:6px;height:174px;border-radius:999px;background:rgba(226,216,202,.92);box-shadow:inset 0 0 0 1px rgba(160,145,125,.22),0 8px 22px rgba(50,42,32,.12);pointer-events:none;}\n' +
      '  #'+RAIL_ID+'::before{content:"";position:absolute;left:50%;top:var(--katapata-rail-pos,0%);transform:translate(-50%,-50%);width:14px;height:14px;border-radius:999px;background:#d8aa2a;box-shadow:0 0 0 4px rgba(216,170,42,.18),0 2px 8px rgba(60,48,24,.18);}\n' +
      '}\n' +
      '@media (max-width:699px),(min-width:1181px),(pointer:fine){#'+RAIL_ID+'{display:none!important;}}\n' +
      '/* Measurement unit switch dock: proxy only. Original language switch stays where it is. */\n' +
      '#'+UNIT_BOX_ID+'{display:none;}\n' +
      '.katapata-measure-unit-ready #'+UNIT_BOX_ID+'{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 6px;padding:6px 7px;border:1px solid #eadfce;border-radius:12px;background:#fffaf2;color:#3f3932;}\n' +
      '.optionalSleeveBox #'+UNIT_BOX_ID+'{margin:0 0 5px;padding:5px 6px;border-radius:11px;background:#fffdf8;}\n' +
      '#'+UNIT_BOX_ID+' .kmud-label{font-size:10px;font-weight:950;letter-spacing:.04em;color:#5d5247;white-space:nowrap;}\n' +
      '#'+UNIT_BOX_ID+' .kmud-note{display:none;}\n' +
      '#'+UNIT_BOX_ID+' .kmud-controls{display:inline-flex;gap:5px;align-items:center;flex-wrap:nowrap;}\n' +
      '#'+UNIT_BOX_ID+' .kmud-unit-btn{appearance:none;border:1px solid #ded5ca;background:#fbf8f2;color:#4f463d;min-height:27px;height:27px;padding:0 9px;border-radius:999px;font-size:10.5px;font-weight:950;line-height:1;box-shadow:none;}\n' +
      '#'+UNIT_BOX_ID+' .kmud-unit-btn.is-active{background:#171717!important;color:#fffdf8!important;border-color:#171717!important;}\n' +
      '#'+UNIT_BOX_ID+' .kmud-unit-btn:disabled{opacity:.42;cursor:not-allowed;}\n' +
      '@media (min-width:700px) and (max-width:1100px) and (orientation:portrait){.optionalSleeveBox #'+UNIT_BOX_ID+'{margin-bottom:6px;padding:6px 7px;} #'+UNIT_BOX_ID+' .kmud-label{font-size:11.5px;} #'+UNIT_BOX_ID+' .kmud-unit-btn{min-height:32px;height:32px;font-size:11.5px;padding:0 12px;}}\n';
    document.head.appendChild(style);
  }

  function removeOldNav() {
    var old = document.getElementById(OLD_NAV_ID);
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (document.body) document.body.classList.remove('katapata-tablet-workbar-ready');
  }

  function getMainStage() {
    var main = document.querySelector('.main[data-stage]');
    var st = main && main.getAttribute('data-stage');
    if (st) return st;
    var active = document.querySelector('.appStagebar .stage.active, .stagebar .stage.active, .stage.active');
    return txt(active);
  }

  function stageIndex(stageText) {
    var s = String(stageText || '');
    if (/measure|寸法|入力|input|measurement/i.test(s)) return 0;
    if (/adjust|トップス調整|調整|tops/i.test(s)) return 1;
    if (/bottom|ボトム|skirt|pants/i.test(s)) return 2;
    if (/dart|ダーツ/i.test(s)) return 3;
    if (/confirm|確定/i.test(s)) return 4;
    if (/output|出力|印刷|print/i.test(s)) return 5;
    return 0;
  }

  function ensureRail() {
    injectStyle();
    removeOldNav();
    var rail = document.getElementById(RAIL_ID);
    if (!rail) {
      rail = document.createElement('div');
      rail.id = RAIL_ID;
      rail.setAttribute('aria-hidden', 'true');
      document.body.appendChild(rail);
    }
    var pos = (stageIndex(getMainStage()) / 5 * 100).toFixed(1) + '%';
    if (rail.style.getPropertyValue('--katapata-rail-pos') !== pos) {
      rail.style.setProperty('--katapata-rail-pos', pos);
    }
  }

  function isHidden(el) {
    if (!el || !el.getBoundingClientRect) return true;
    var r = el.getBoundingClientRect();
    var cs = window.getComputedStyle ? window.getComputedStyle(el) : null;
    return (r.width === 0 && r.height === 0) || (cs && (cs.display === 'none' || cs.visibility === 'hidden'));
  }

  function isUnitText(text, unit) {
    var t = String(text || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (!t || t.length > 24) return false;
    if (unit === 'cm') return /^(cm|ｃｍ|センチ|centimeter|centimeters)$/.test(t);
    return /^(inch|inches|in\.?|インチ)$/.test(t);
  }

  function controlRoot(el) {
    if (!el) return null;
    return el.closest('button,label,[role="button"],.stage,.chip,input,select') || el;
  }

  function findDirectUnitControl(unit) {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('button,label,[role="button"],.stage,.chip,input,select,span,a'));
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el || el.closest('#'+UNIT_BOX_ID)) continue;
      if (el.closest('#katapataTabletStepbar') || el.closest('#katapataTabletSlimRail')) continue;
      if (isHidden(el)) continue;

      if (el.tagName === 'SELECT') {
        var opts = Array.prototype.slice.call(el.options || []);
        var hasThis = opts.some(function (o) { return isUnitText(o.textContent || o.value, unit); });
        var hasOther = opts.some(function (o) { return isUnitText(o.textContent || o.value, unit === 'cm' ? 'inch' : 'cm'); });
        if (hasThis && hasOther) return el;
      }

      var t = txt(el) || (el.value || '').trim();
      if (!isUnitText(t, unit)) continue;
      var root = controlRoot(el);
      if (!root || root.closest('#'+UNIT_BOX_ID)) continue;

      // Avoid grabbing language controls or large mixed containers.
      var rt = txt(root) || (root.value || '').trim();
      if (rt.length > 30 && !isUnitText(rt, unit)) continue;
      if (/日本語|English|英語|language|lang/i.test(rt)) continue;
      return root;
    }
    return null;
  }

  function findUnitSelect() {
    var selects = Array.prototype.slice.call(document.querySelectorAll('select'));
    return selects.find(function (sel) {
      if (sel.closest('#'+UNIT_BOX_ID)) return false;
      var opts = Array.prototype.slice.call(sel.options || []);
      return opts.some(function (o) { return isUnitText(o.textContent || o.value, 'cm'); }) && opts.some(function (o) { return isUnitText(o.textContent || o.value, 'inch'); });
    }) || null;
  }

  function clickOriginalUnit(unit) {
    var sel = findUnitSelect();
    if (sel) {
      var opts = Array.prototype.slice.call(sel.options || []);
      var opt = opts.find(function (o) { return isUnitText(o.textContent || o.value, unit); });
      if (opt) {
        sel.value = opt.value;
        sel.dispatchEvent(new Event('input', { bubbles: true }));
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        scheduleUpdate();
        return;
      }
    }
    var ctl = findDirectUnitControl(unit);
    if (ctl && typeof ctl.click === 'function') {
      ctl.click();
      scheduleUpdate();
    }
  }

  function originalUnitActive(unit) {
    var sel = findUnitSelect();
    if (sel) {
      var opt = sel.options[sel.selectedIndex];
      return !!(opt && isUnitText(opt.textContent || opt.value, unit));
    }
    var ctl = findDirectUnitControl(unit);
    if (!ctl) return false;
    if (ctl.matches && ctl.matches('input[type="radio"],input[type="checkbox"]')) return !!ctl.checked;
    if (/\bactive\b|\bis-active\b|\bselected\b/.test(ctl.className || '')) return true;
    if (ctl.getAttribute('aria-pressed') === 'true' || ctl.getAttribute('aria-checked') === 'true') return true;
    var inp = ctl.querySelector && ctl.querySelector('input[type="radio"],input[type="checkbox"]');
    if (inp && inp.checked) return true;
    return false;
  }

  function findMeasurePanel() {
    var main = document.querySelector('.main[data-stage="measure"]');
    if (!main) return null;
    var panels = Array.prototype.slice.call(main.querySelectorAll('.side .panel, .measureEntryPanel, .panel'));
    return panels.find(function (p) { return /バスト|ウエスト|背丈|ヒップ|袖丈|Bust|Waist|Back length|Hip|Sleeve/i.test(txt(p)); }) || panels[0] || null;
  }

  function ensureUnitDock() {
    injectStyle();
    var main = document.querySelector('.main[data-stage="measure"]');
    if (!main) {
      document.body.classList.remove('katapata-measure-unit-ready');
      var oldDock = document.getElementById(UNIT_BOX_ID);
      if (oldDock && oldDock.parentNode) oldDock.parentNode.removeChild(oldDock);
      return;
    }

    var cmCtl = findDirectUnitControl('cm') || findUnitSelect();
    var inchCtl = findDirectUnitControl('inch') || findUnitSelect();
    if (!cmCtl || !inchCtl) {
      document.body.classList.remove('katapata-measure-unit-ready');
      return;
    }

    var panel = findMeasurePanel();
    if (!panel) return;

    var dock = document.getElementById(UNIT_BOX_ID);
    if (!dock) {
      dock = document.createElement('div');
      dock.id = UNIT_BOX_ID;
      dock.innerHTML = '<div><div class="kmud-label"></div><div class="kmud-note"></div></div><div class="kmud-controls"><button type="button" class="kmud-unit-btn" data-unit="cm">cm</button><button type="button" class="kmud-unit-btn" data-unit="inch">inch</button></div>';
      dock.querySelector('[data-unit="cm"]').addEventListener('click', function () { clickOriginalUnit('cm'); });
      dock.querySelector('[data-unit="inch"]').addEventListener('click', function () { clickOriginalUnit('inch'); });
    }
    var sleeveBox = main.querySelector('.optionalSleeveBox');
    var targetParent = sleeveBox || panel;
    var beforeNode = sleeveBox ? (sleeveBox.querySelector('.optionalSleeveGrid') || null) : panel.firstChild;
    if (dock.parentElement !== targetParent) targetParent.insertBefore(dock, beforeNode);
    else if (beforeNode && dock.nextSibling !== beforeNode) targetParent.insertBefore(dock, beforeNode);

    var en = looksEnglish();
    dock.querySelector('.kmud-label').textContent = en ? 'Unit' : '単位';
    dock.querySelector('.kmud-note').textContent = en ? 'Choose before entering measurements' : '入力前に選べます';

    var cmActive = originalUnitActive('cm');
    var inchActive = originalUnitActive('inch');
    var cmBtn = dock.querySelector('[data-unit="cm"]');
    var inchBtn = dock.querySelector('[data-unit="inch"]');
    cmBtn.classList.toggle('is-active', cmActive || (!inchActive && !cmActive));
    inchBtn.classList.toggle('is-active', inchActive);
    document.body.classList.add('katapata-measure-unit-ready');
  }

  function scheduleUpdate() {
    window.setTimeout(function () { ensureRail(); ensureUnitDock(); }, 0);
    window.setTimeout(function () { ensureRail(); ensureUnitDock(); }, 120);
    window.setTimeout(function () { ensureRail(); ensureUnitDock(); }, 420);
  }

  function start() {
    injectStyle();
    scheduleUpdate();
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('orientationchange', scheduleUpdate);
    if (window.MutationObserver) {
      var obs = new MutationObserver(scheduleUpdate);
      obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-stage','class'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

/*
 * KATAPATA offline support + autosave safety net.
 * - Registers the site service worker for offline use after first online load.
 * - Keeps a local draft snapshot of common input/select/textarea fields.
 * - Safe mode: restores values only and avoids interfering with stage transitions.
 * - Shows a small restore notice if previous work is found after reload.
 */
(function () {
  'use strict';

  var SW_PATH = '/service-worker.js';
  var DRAFT_KEY = 'katapata.site.autodraft.v1';
  var DISMISSED_KEY = 'katapata.site.autodraft.dismissedAt.v1';
  var SAVE_DELAY = 700;
  var MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14; // 14 days
  var saveTimer = 0;

  function isKataPath() {
    return /\/tools\/sloper\/app\//.test(location.pathname);
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (!/^https?:$/.test(location.protocol)) return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(SW_PATH, { scope: '/' }).catch(function () {});
    });
  }

  function isSensitiveField(el) {
    if (!el || !el.tagName) return true;
    var tag = el.tagName.toLowerCase();
    if (!/^(input|select|textarea)$/.test(tag)) return true;
    var type = (el.type || '').toLowerCase();
    if (['password', 'file', 'hidden', 'submit', 'button', 'reset'].indexOf(type) !== -1) return true;
    var marker = ((el.id || '') + ' ' + (el.name || '') + ' ' + (el.className || '') + ' ' + (el.placeholder || '') + ' ' + (el.getAttribute('aria-label') || '')).toLowerCase();
    if (/license|licence|key|stripe|payment|card|secret|token|coupon|email/.test(marker)) return true;
    return false;
  }

  function fieldKey(el, index) {
    var tag = el.tagName.toLowerCase();
    if (el.id) return tag + '#id:' + el.id;
    if (el.name) return tag + '#name:' + el.name;
    var label = el.getAttribute('aria-label') || el.getAttribute('placeholder') || '';
    if (label) return tag + '#label:' + label;
    return tag + '#index:' + index;
  }

  function getFields() {
    return Array.prototype.slice.call(document.querySelectorAll('input, select, textarea')).filter(function (el) {
      return !isSensitiveField(el);
    });
  }

  function readField(el) {
    var type = (el.type || '').toLowerCase();
    if (type === 'checkbox' || type === 'radio') return { checked: !!el.checked };
    return { value: el.value };
  }

  function writeField(el, data) {
    if (!data) return;
    var type = (el.type || '').toLowerCase();
    var changed = false;
    if ((type === 'checkbox' || type === 'radio') && Object.prototype.hasOwnProperty.call(data, 'checked')) {
      changed = el.checked !== !!data.checked;
      el.checked = !!data.checked;
    } else if (Object.prototype.hasOwnProperty.call(data, 'value')) {
      changed = el.value !== String(data.value == null ? '' : data.value);
      el.value = String(data.value == null ? '' : data.value);
    }
    if (changed) {
      try { el.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
      try { el.dispatchEvent(new Event('change', { bubbles: true })); } catch (e) {}
    }
  }

  function getActiveStage() {
    var main = document.querySelector('.main[data-stage]');
    return main ? (main.getAttribute('data-stage') || '') : '';
  }

  function clickStage(stage) {
    if (!stage) return;
    var candidates = Array.prototype.slice.call(document.querySelectorAll('.stage, button, [role="button"]'));
    var textMap = {
      measure: /寸法|input|measure/i,
      adjust: /トップス調整|調整|tops|adjust/i,
      bottom: /ボトムス調整|ボトム|bottom/i,
      dart: /ダーツ|dart/i,
      confirm: /確定|confirm/i,
      output: /出力|印刷|output|print/i
    };
    var re = textMap[stage];
    if (!re) return;
    var btn = candidates.find(function (el) { return re.test((el.textContent || '').trim()); });
    if (btn && !btn.disabled) {
      try { btn.click(); } catch (e) {}
    }
  }

  function takeSnapshot() {
    var fields = {};
    getFields().forEach(function (el, index) {
      fields[fieldKey(el, index)] = readField(el);
    });
    return {
      version: 1,
      savedAt: Date.now(),
      path: location.pathname,
      stage: getActiveStage(),
      fields: fields
    };
  }

  function saveDraft() {
    if (!isKataPath()) return;
    try {
      var snapshot = takeSnapshot();
      localStorage.setItem(DRAFT_KEY, JSON.stringify(snapshot));
    } catch (e) {}
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveDraft, SAVE_DELAY);
  }

  function readDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.savedAt || Date.now() - data.savedAt > MAX_AGE_MS) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function hasUsefulDraft(data) {
    if (!data || !data.fields) return false;
    return Object.keys(data.fields).some(function (key) {
      var v = data.fields[key];
      return v && ((typeof v.value === 'string' && v.value.trim() !== '') || v.checked === true);
    });
  }

  function restoreDraft(data) {
    if (!data || !data.fields) return;
    var fields = getFields();
    var byKey = {};
    fields.forEach(function (el, index) { byKey[fieldKey(el, index)] = el; });
    Object.keys(data.fields).forEach(function (key) {
      if (byKey[key]) writeField(byKey[key], data.fields[key]);
    });
    // Restore only input values. Do not auto-click stages here; stage transitions can be delicate.
    setTimeout(saveDraft, 500);
    showInlineNotice('前回の入力内容を復元しました。', 'restored');
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch (e) {}
  }

  function ensureStyle() {
    if (document.getElementById('katapataOfflineAutosaveStyle')) return;
    var css = '' +
      '#katapataOfflineRestore{position:fixed;left:50%;bottom:18px;z-index:9998;transform:translateX(-50%);max-width:min(92vw,520px);display:flex;align-items:center;gap:10px;padding:10px 11px;border:1px solid #e3d6c5;border-radius:16px;background:rgba(255,253,248,.96);box-shadow:0 14px 36px rgba(0,0,0,.14);color:#302b25;font-size:12px;font-weight:850;line-height:1.45;backdrop-filter:blur(6px);}\n' +
      '#katapataOfflineRestore .koar-text{min-width:0;flex:1;}\n' +
      '#katapataOfflineRestore .koar-actions{display:flex;gap:6px;flex:0 0 auto;}\n' +
      '#katapataOfflineRestore button{height:30px;min-height:30px;border-radius:999px;padding:0 10px;font-size:11px;font-weight:950;}\n' +
      '#katapataOfflineRestore .koar-sub{background:#f1eadf!important;color:#4f463d!important;border:1px solid #e0d3c2!important;}\n' +
      '#katapataOfflineToast{position:fixed;right:12px;bottom:12px;z-index:9997;padding:6px 9px;border-radius:999px;background:rgba(23,23,23,.80);color:#fffdf8;font-size:10px;font-weight:900;opacity:0;transform:translateY(6px);transition:opacity .18s ease,transform .18s ease;pointer-events:none;}\n' +
      '#katapataOfflineToast.show{opacity:1;transform:translateY(0);}\n' +
      'body.katapata-offline-now::before{content:"オフライン中：入力内容はこの端末に一時保存されます";position:fixed;left:50%;top:8px;z-index:9997;transform:translateX(-50%);padding:5px 10px;border-radius:999px;background:#fff6d6;border:1px solid #e2bd46;color:#4d3b08;font-size:10px;font-weight:950;box-shadow:0 6px 18px rgba(0,0,0,.10);}\n' +
      '@media (max-width:560px){#katapataOfflineRestore{left:10px;right:10px;bottom:12px;transform:none;align-items:flex-start;flex-direction:column;}#katapataOfflineRestore .koar-actions{width:100%;}#katapataOfflineRestore button{flex:1;}}\n';
    var style = document.createElement('style');
    style.id = 'katapataOfflineAutosaveStyle';
    style.textContent = css;
    document.head.appendChild(style);
  }

  var toastTimer = 0;
  function showSavedToast() {
    var toast = document.getElementById('katapataOfflineToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'katapataOfflineToast';
      toast.textContent = '自動保存済み';
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 900);
  }

  function showInlineNotice(text, mode) {
    ensureStyle();
    var old = document.getElementById('katapataOfflineRestore');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var box = document.createElement('div');
    box.id = 'katapataOfflineRestore';
    box.innerHTML = '<div class="koar-text"></div><div class="koar-actions"><button type="button" class="koar-sub">OK</button></div>';
    box.querySelector('.koar-text').textContent = text;
    box.querySelector('button').addEventListener('click', function () {
      if (box.parentNode) box.parentNode.removeChild(box);
    });
    document.body.appendChild(box);
    if (mode === 'restored') {
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 2400);
    }
  }

  function showRestorePrompt(data) {
    if (!data || document.getElementById('katapataOfflineRestore')) return;
    ensureStyle();
    var dt = new Date(data.savedAt);
    var stamp = (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' + String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
    var box = document.createElement('div');
    box.id = 'katapataOfflineRestore';
    box.innerHTML = '<div class="koar-text">前回の作業データがあります。復元しますか？<br><small>保存：' + stamp + '</small></div><div class="koar-actions"><button type="button" data-restore>復元する</button><button type="button" class="koar-sub" data-clear>削除</button></div>';
    box.querySelector('[data-restore]').addEventListener('click', function () {
      restoreDraft(data);
      if (box.parentNode) box.parentNode.removeChild(box);
    });
    box.querySelector('[data-clear]').addEventListener('click', function () {
      clearDraft();
      if (box.parentNode) box.parentNode.removeChild(box);
    });
    document.body.appendChild(box);
  }

  function updateOnlineState() {
    document.body.classList.toggle('katapata-offline-now', navigator.onLine === false);
  }

  function installAutosave() {
    if (!isKataPath()) return;
    ensureStyle();
    document.addEventListener('input', scheduleSave, true);
    document.addEventListener('change', scheduleSave, true);
    window.addEventListener('beforeunload', saveDraft);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') saveDraft();
    });
    window.addEventListener('online', updateOnlineState);
    window.addEventListener('offline', updateOnlineState);
    updateOnlineState();

    setTimeout(function () {
      var data = readDraft();
      if (hasUsefulDraft(data)) showRestorePrompt(data);
    }, 1400);

    setTimeout(saveDraft, 2200);
  }

  registerServiceWorker();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installAutosave);
  } else {
    installAutosave();
  }
})();
