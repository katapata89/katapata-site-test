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

  function parseSummary(raw) {
    var lines = (raw || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
    var target = '';
    var kind = '';
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] === '出力対象' && lines[i + 1]) target = lines[i + 1];
      if (lines[i] === '区分' && lines[i + 1]) kind = lines[i + 1];
    }
    if (!target) {
      var m = (raw || '').match(/出力対象\s*([^\n]+)/);
      if (m) target = m[1].trim();
    }
    if (!kind) {
      var k = (raw || '').match(/区分\s*([^\n]+)/);
      if (k) kind = k[1].trim();
    }
    return { target: target || '選択中の製図', kind: kind || '' };
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

    var existing = side.querySelector('.katapata-output-final');
    if (existing && !hasDirectPaidButtons(side)) return;

    injectOutputStyle();

    var buttons = Array.prototype.slice.call(side.querySelectorAll('button'));
    var sampleBtn = findButton(buttons, [/縮小サンプル/, /サンプルPDF/]);
    var purchaseBtn = findButton(
      buttons,
      [/購入ページへ/, /購入ページ/, /^\s*購入\s*$/],
      [/通常サイズPDF/, /A4分割印刷PDF/, /通常サイズ・A4分割印刷PDF/]
    );
    var backBtn = findButton(buttons, [/戻る.*確定/, /確定へ戻る/, /^\s*戻る\s*$/, /^\s*確定\s*$/]);
    var summary = parseSummary(raw);

    var compact = makeEl('div', 'katapata-output-final');
    var panel = makeEl('div', 'kop-panel');
    compact.appendChild(panel);

    panel.appendChild(makeEl('div', 'kop-title', 'PDF出力'));
    var target = makeEl('div', 'kop-target');
    target.appendChild(makeEl('span', 'kop-pill', summary.target));
    if (summary.kind) target.appendChild(makeEl('span', 'kop-pill', summary.kind));
    panel.appendChild(target);

    var free = makeEl('section', 'kop-section free');
    free.appendChild(makeEl('div', 'kop-section-title', '無料：縮小サンプルPDF'));
    free.appendChild(makeEl('p', 'kop-desc', '確認用です。実寸ではありません。'));
    var freeActions = makeEl('div', 'kop-actions');
    if (sampleBtn) {
      sampleBtn.textContent = '縮小サンプルを出力';
      freeActions.appendChild(sampleBtn);
    }
    else freeActions.appendChild(makeEl('div', 'kop-empty', '縮小サンプルPDFのボタンが見つかりませんでした。'));
    free.appendChild(freeActions);
    panel.appendChild(free);

    var paid = makeEl('section', 'kop-section paid');
    paid.appendChild(makeEl('div', 'kop-section-title', '有料：印刷用PDF'));
    paid.appendChild(makeEl('p', 'kop-desc', '有料出力では、通常サイズPDFとA4分割印刷PDFをセットで使えます。トップスは前・後・袖の3点セット800円、ボトムスはスカートとパンツ、各400円を予定しています。'));
    var paidActions = makeEl('div', 'kop-actions');
    if (purchaseBtn) {
      purchaseBtn.textContent = '印刷用PDFを購入';
      paidActions.appendChild(purchaseBtn);
    }
    else paidActions.appendChild(makeEl('div', 'kop-empty', '購入後に利用できます。テスト時以外は直接ダウンロードボタンを表示しません。'));
    paid.appendChild(paidActions);
    panel.appendChild(paid);

    if (backBtn) {
      var back = makeEl('div', 'kop-actions');
      backBtn.textContent = '確定に戻る';
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
