/* @ds-bundle: {"format":3,"namespace":"NoesisMachinesDesignSystem_518f2a","components":[],"sourceHashes":{"slides/ClosingSlide.jsx":"b9ccda14db97","slides/ContentSlide.jsx":"0019d45c7419","slides/MetricsSlide.jsx":"34ae3c6ae1c6","slides/QuoteSlide.jsx":"d397d209a1cb","slides/SectionSlide.jsx":"78079896471d","slides/TitleSlide.jsx":"ecfe638ff7ea","slides/deck-stage.js":"ad1c016a6256","ui_kits/website/CaseStudy.jsx":"a4bcaf916136","ui_kits/website/ContactBlock.jsx":"60f8e54b81f5","ui_kits/website/FocusGrid.jsx":"01f321eb4bc0","ui_kits/website/Footer.jsx":"d23bb326e03b","ui_kits/website/Hero.jsx":"c9388b056e04","ui_kits/website/ManifestoBlock.jsx":"eb32cb91fb84","ui_kits/website/Nav.jsx":"d2e3e2ce5776"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NoesisMachinesDesignSystem_518f2a = window.NoesisMachinesDesignSystem_518f2a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// slides/ClosingSlide.jsx
try { (() => {
// Closing slide — minimal, contact details.
function ClosingSlide() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "06 Closing",
    style: {
      width: 1280,
      height: 720,
      background: 'var(--ink)',
      color: 'var(--bone)',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-lockup-bone.svg",
    height: "64"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--tea)',
      marginBottom: 32
    }
  }, "Talk to us"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 96,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 56px',
      maxWidth: '14ch'
    }
  }, "Start with a ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--tea)'
    }
  }, "problem.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 32,
      paddingTop: 32,
      borderTop: '1px solid #2F2F36',
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: '#C9C5BB',
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#8C8881',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Email"), "hello@noesismachines.ai"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#8C8881',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Office"), "Colombo \xB7 Sri Lanka"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#8C8881',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Web"), "noesismachines.ai"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 24,
      color: '#C9C5BB'
    }
  }, "Machines that know."));
}
window.ClosingSlide = ClosingSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/ClosingSlide.jsx", error: String((e && e.message) || e) }); }

// slides/ContentSlide.jsx
try { (() => {
// Content slide with a 2-column body — left side eyebrow + headline, right is structured content.
function ContentSlide() {
  const items = [{
    n: '01',
    t: 'Industrial Visual AI',
    b: 'Quality control in tea, apparel, rubber. First deployment grading 2.4M leaves a day.'
  }, {
    n: '02',
    t: 'Deep Domain AI',
    b: 'Built with textile engineers and agronomists. Encodes domain knowledge generic systems cannot.'
  }, {
    n: '03',
    t: 'Sinhala Language AI',
    b: 'Tokenizer + small language model. Foundational, calibrated to linguistic structure.'
  }, {
    n: '04',
    t: 'Sensor-Integrated AI',
    b: 'IoT + AI inference, in production loops. Plantation health, drift detection.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "03 Focus",
    style: {
      width: 1280,
      height: 720,
      background: 'var(--bone)',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 16
    }
  }, "Focus areas"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 64,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "Four practices, one method.")), /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-mark.svg",
    width: "32",
    height: "32"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 0,
      border: '1px solid var(--mist)',
      borderRadius: 8,
      background: 'var(--paper)',
      flex: 1
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.n,
    style: {
      padding: 36,
      borderRight: i % 2 === 0 ? '1px solid var(--mist)' : 'none',
      borderBottom: i < 2 ? '1px solid var(--mist)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      letterSpacing: '0.08em',
      color: 'var(--clay)'
    }
  }, it.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 36,
      margin: '0 0 12px',
      letterSpacing: '-0.015em',
      lineHeight: 1.1
    }
  }, it.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--ink-2)',
      margin: 0,
      maxWidth: '40ch'
    }
  }, it.b))))));
}
window.ContentSlide = ContentSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/ContentSlide.jsx", error: String((e && e.message) || e) }); }

// slides/MetricsSlide.jsx
try { (() => {
// Metrics slide — 3 large numbers, supporting caption.
function MetricsSlide() {
  const ms = [{
    v: '20+',
    l: 'Years AI/ML, founders'
  }, {
    v: '0.93',
    l: 'F1, tea grader v3 in production'
  }, {
    v: '10×',
    l: 'Below NA consulting rates'
  }];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "05 Metrics",
    style: {
      width: 1280,
      height: 720,
      background: 'var(--bone)',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 16
    }
  }, "Traction \xB7 Q2 2026"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 72,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: '18ch'
    }
  }, "Real work, in production.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 0,
      borderTop: '1px solid var(--mist)',
      borderBottom: '1px solid var(--mist)'
    }
  }, ms.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.l,
    style: {
      padding: '40px 32px',
      borderRight: i < 2 ? '1px solid var(--mist)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 144,
      lineHeight: 1,
      letterSpacing: '-0.025em',
      color: 'var(--ink)',
      marginBottom: 16
    }
  }, m.v.includes('+') || m.v.includes('×') ? /*#__PURE__*/React.createElement(React.Fragment, null, m.v.slice(0, -1), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--clay)'
    }
  }, m.v.slice(-1))) : m.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, m.l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-mark.svg",
    width: "24",
    height: "24"
  }), /*#__PURE__*/React.createElement("span", null, "05 / 06")));
}
window.MetricsSlide = MetricsSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/MetricsSlide.jsx", error: String((e && e.message) || e) }); }

// slides/QuoteSlide.jsx
try { (() => {
// Big quote slide — large display serif, attribution as caption.
function QuoteSlide() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "04 Quote",
    style: {
      width: 1280,
      height: 720,
      background: 'var(--bone)',
      padding: '80px 120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-mark.svg",
    width: "32",
    height: "32"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, "Manifesto \xB7 \xA72")), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 80,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      margin: 0,
      color: 'var(--ink)',
      maxWidth: '20ch'
    }
  }, "We do not wrap APIs. We invest in ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--clay)'
    }
  }, "understanding"), " a domain deeply."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: 'var(--ink-3)'
    }
  }), "Founding principle"));
}
window.QuoteSlide = QuoteSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/QuoteSlide.jsx", error: String((e && e.message) || e) }); }

// slides/SectionSlide.jsx
try { (() => {
// Section header slide — full bleed ink with serif italic.
function SectionSlide({
  number = "02",
  kicker = "Mission",
  title = "Deep AI for the real world."
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": `${number} ${kicker}`,
    style: {
      width: 1280,
      height: 720,
      background: 'var(--ink)',
      color: 'var(--bone)',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-mark-bone.svg",
    width: "40",
    height: "40"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#8C8881'
    }
  }, "\xA7", number)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--tea)',
      marginBottom: 32
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 112,
      lineHeight: 1.0,
      letterSpacing: '-0.025em',
      margin: 0,
      maxWidth: '15ch'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#8C8881'
    }
  }, "Noesis Machines \xB7 Confidential"));
}
window.SectionSlide = SectionSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/SectionSlide.jsx", error: String((e && e.message) || e) }); }

// slides/TitleSlide.jsx
try { (() => {
// Title slide — big italic display, mark in corner.
function TitleSlide() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "01 Title",
    style: {
      width: 1280,
      height: 720,
      background: 'var(--bone)',
      position: 'relative',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-lockup.svg",
    height: "56",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, "Investor Brief \xB7 April 2026")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: 'var(--ink-3)'
    }
  }), "Deep AI \xB7 Sri Lanka"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 144,
      lineHeight: 0.95,
      letterSpacing: '-0.025em',
      margin: 0,
      maxWidth: '13ch'
    }
  }, "Machines that ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--clay)',
      fontStyle: 'italic'
    }
  }, "know."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Noesis Machines (Pvt) Ltd"), /*#__PURE__*/React.createElement("span", null, "noesismachines.ai")));
}
window.TitleSlide = TitleSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/TitleSlide.jsx", error: String((e && e.message) || e) }); }

// slides/deck-stage.js
try { (() => {
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const pad2 = n => String(n).padStart(2, '0');
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      ::slotted(*:last-child) {
        break-after: auto;
        page-break-after: auto;
      }
      .overlay, .tapzones { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTapBack = this._onTapBack.bind(this);
      this._onTapForward = this._onTapForward.bind(this);
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      // Initial collection + layout happens via slotchange, which fires on mount.
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        this._fit();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Tap zones (mobile): left third = back, right third = forward.
      const tapzones = document.createElement('div');
      tapzones.className = 'tapzones export-hidden';
      tapzones.setAttribute('aria-hidden', 'true');
      tapzones.setAttribute('data-noncommentable', '');
      const tzBack = document.createElement('div');
      tzBack.className = 'tapzone tapzone--back';
      const tzMid = document.createElement('div');
      tzMid.className = 'tapzone tapzone--mid';
      tzMid.style.pointerEvents = 'none';
      const tzFwd = document.createElement('div');
      tzFwd.className = 'tapzone tapzone--fwd';
      tzBack.addEventListener('click', this._onTapBack);
      tzFwd.addEventListener('click', this._onTapForward);
      tapzones.append(tzBack, tzMid, tzFwd);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-noncommentable', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._go(this._index - 1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._go(this._index + 1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));
      this._root.append(style, stage, tapzones, overlay);
      this._canvas = canvas;
      this._slot = slot;
      this._overlay = overlay;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    }
    _onSlotChange() {
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        // Determine a label for comment flow: prefer explicit data-label,
        // then an existing data-screen-label, then first heading, else "Slide".
        let label = slide.getAttribute('data-label');
        if (!label) {
          const existing = slide.getAttribute('data-screen-label');
          if (existing) {
            // Strip any leading number the author may have included.
            label = existing.replace(/^\s*\d+\s*/, '').trim() || existing;
          }
        }
        if (!label) {
          const h = slide.querySelector('h1, h2, h3, [data-title]');
          if (h) label = (h.textContent || '').trim().slice(0, 40);
        }
        if (!label) label = 'Slide';
        slide.setAttribute('data-screen-label', `${pad2(n)} ${label}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
    }
    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) {
        this._notes = [];
        return;
      }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      if (!this._overlay) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _fit() {
      if (!this._canvas) return;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onTapBack(e) {
      e.preventDefault();
      this._go(this._index - 1, 'tap');
    }
    _onTapForward(e) {
      e.preventDefault();
      this._go(this._index + 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._go(this._index + 1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._go(this._index - 1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._go(this._index + 1, 'api');
    }
    prev() {
      this._go(this._index - 1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/deck-stage.js", error: String((e && e.message) || e) }); }

// ui_kits/website/CaseStudy.jsx
try { (() => {
// Case study — tea grading. Editorial layout with metric strip.
function CaseStudy() {
  return /*#__PURE__*/React.createElement("section", {
    id: "research",
    style: {
      padding: '120px 32px',
      borderTop: '1px solid var(--mist)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 24
    }
  }, "Case study \xB7 Industrial Vision"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(40px, 5vw, 72px)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 32px'
    }
  }, "Grading 2.4 million leaves a day, with a model that knows tea."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.55,
      color: 'var(--ink-2)',
      maxWidth: '52ch',
      marginBottom: 24
    }
  }, "Sri Lanka's tea industry grades by hand and by long-held institutional memory. We worked alongside graders for six weeks before writing model code \u2014 learning what matters, where edge cases hide, and why ImageNet proxies fail on tea leaves."), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--ink)',
      borderBottom: '1px solid var(--ink)',
      paddingBottom: 4,
      textDecoration: 'none'
    }
  }, "Read the full case study \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--mist)',
      borderRadius: 8,
      padding: 0,
      overflow: 'hidden'
    }
  }, [{
    l: 'Grader F1, production',
    v: '0.927'
  }, {
    l: 'Throughput',
    v: '2.4M leaves/day'
  }, {
    l: 'Inference latency',
    v: '38 ms'
  }, {
    l: 'Languages, UI',
    v: 'Sinhala · English'
  }, {
    l: 'Deployment',
    v: 'On-prem, edge GPUs'
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.l,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: '20px 28px',
      borderBottom: i < 4 ? '1px solid var(--mist)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, m.l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      letterSpacing: '-0.01em',
      color: 'var(--ink)'
    }
  }, m.v)))))));
}
window.CaseStudy = CaseStudy;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CaseStudy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactBlock.jsx
try { (() => {
// Contact — minimal form, real-feeling validation states.
const {
  useState: useStateC
} = React;
function ContactBlock() {
  const [sent, setSent] = useStateC(false);
  const [form, setForm] = useStateC({
    name: '',
    org: '',
    problem: ''
  });
  const submit = e => {
    e.preventDefault();
    setSent(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: '120px 32px',
      borderTop: '1px solid var(--mist)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 980,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 80
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 24
    }
  }, "Talk to us"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 56,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 24px'
    }
  }, "Start with a problem."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--ink-2)',
      maxWidth: '38ch'
    }
  }, "We respond personally to every inquiry. Engagements begin with a short, paid scoping engagement \u2014 no decks, no slideware."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--ink-2)',
      lineHeight: 1.8
    }
  }, /*#__PURE__*/React.createElement("div", null, "hello@noesismachines.ai"), /*#__PURE__*/React.createElement("div", null, "Colombo \xB7 Sri Lanka"))), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--moss)',
      borderRadius: 8,
      padding: 40,
      alignSelf: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--moss)',
      marginBottom: 16
    }
  }, "Received"), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 28,
      margin: '0 0 12px',
      letterSpacing: '-0.015em'
    }
  }, "Thank you, ", form.name || 'friend', "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ink-2)',
      margin: 0
    }
  }, "A founder will reply within two working days. If urgent, write directly to hello@noesismachines.ai.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--mist)',
      borderRadius: 8,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, [{
    k: 'name',
    l: 'Your name',
    placeholder: 'Anjali Perera'
  }, {
    k: 'org',
    l: 'Organization',
    placeholder: 'Acme Tea Co.'
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.k,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, f.l), /*#__PURE__*/React.createElement("input", {
    value: form[f.k],
    onChange: e => setForm({
      ...form,
      [f.k]: e.target.value
    }),
    placeholder: f.placeholder,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      padding: '11px 14px',
      background: 'var(--bone)',
      border: '1px solid var(--mist)',
      borderRadius: 4,
      color: 'var(--ink)',
      outline: 'none'
    },
    onFocus: e => e.target.style.borderColor = 'var(--clay)',
    onBlur: e => e.target.style.borderColor = 'var(--mist)'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, "What problem are you exploring?"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    value: form.problem,
    onChange: e => setForm({
      ...form,
      problem: e.target.value
    }),
    placeholder: "A short description helps us route you to the right team.",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      padding: '11px 14px',
      background: 'var(--bone)',
      border: '1px solid var(--mist)',
      borderRadius: 4,
      color: 'var(--ink)',
      outline: 'none',
      resize: 'vertical'
    },
    onFocus: e => e.target.style.borderColor = 'var(--clay)',
    onBlur: e => e.target.style.borderColor = 'var(--mist)'
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      padding: '12px 18px',
      background: 'var(--ink)',
      color: 'var(--bone)',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      alignSelf: 'flex-start'
    }
  }, "Send \u2192"))));
}
window.ContactBlock = ContactBlock;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactBlock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FocusGrid.jsx
try { (() => {
// Focus areas — 4 cards in a 2×2 grid with editorial numbering.
function FocusGrid() {
  const areas = [{
    n: '01',
    title: 'Industrial Visual AI',
    blurb: 'Computer vision for quality control in manufacturing and agriculture. First deployed in tea grading; extending to apparel, rubber, and spice.',
    icon: 'eye'
  }, {
    n: '02',
    title: 'Deep Domain AI',
    blurb: 'AI built in tight collaboration with domain experts — textile engineering, plantation agriculture — encoding knowledge no generalist system holds.',
    icon: 'microscope'
  }, {
    n: '03',
    title: 'Sinhala Language AI',
    blurb: 'Foundational tokenizer and small language model for Sinhala. Calibrated to linguistic structure, not adapted from English-centric architectures.',
    icon: 'languages'
  }, {
    n: '04',
    title: 'Sensor-Integrated AI',
    blurb: 'Edge sensing fused with AI inference. Plantation health, industrial process drift detection, decision loops that operate continuously in the field.',
    icon: 'cpu'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "work",
    style: {
      padding: '120px 32px',
      borderTop: '1px solid var(--mist)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 24
    }
  }, "Focus areas"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(40px, 5vw, 72px)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '0 0 64px',
      maxWidth: '20ch'
    }
  }, "Four practices, one method: ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--moss)'
    }
  }, "understand first, build second.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 0,
      border: '1px solid var(--mist)',
      borderRadius: 8,
      overflow: 'hidden',
      background: 'var(--paper)'
    }
  }, areas.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: a.n,
    style: {
      padding: 40,
      borderRight: i % 2 === 0 ? '1px solid var(--mist)' : 'none',
      borderBottom: i < 2 ? '1px solid var(--mist)' : 'none',
      cursor: 'pointer',
      transition: 'background 180ms'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--mist-2)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.08em',
      color: 'var(--clay)'
    }
  }, a.n), /*#__PURE__*/React.createElement("i", {
    "data-lucide": a.icon,
    width: "20",
    height: "20",
    style: {
      strokeWidth: 1.5,
      color: 'var(--ink-2)'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 32,
      margin: '0 0 16px',
      letterSpacing: '-0.015em',
      lineHeight: 1.1
    }
  }, a.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ink-2)',
      margin: 0,
      maxWidth: '38ch'
    }
  }, a.blurb))))));
}
window.FocusGrid = FocusGrid;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FocusGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Footer — ink background, minimal.
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink)',
      color: 'var(--bone)',
      padding: '80px 32px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 48,
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-lockup-bone.svg",
    height: "56",
    alt: "Noesis Machines"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontSize: 14,
      lineHeight: 1.6,
      color: '#C9C5BB',
      maxWidth: '42ch'
    }
  }, "Deep AI research and engineering. Headquartered in Sri Lanka. Working with serious industry on problems that matter.")), [{
    h: 'Practice',
    l: ['Industrial Vision', 'Domain AI', 'Language AI', 'Sensor + IoT']
  }, {
    h: 'Company',
    l: ['About', 'Manifesto', 'Careers', 'Press']
  }, {
    h: 'Contact',
    l: ['hello@noesismachines.ai', 'Colombo · Sri Lanka', 'LinkedIn ↗', 'arXiv ↗']
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#8C8881',
      marginBottom: 16
    }
  }, col.h), col.l.map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    style: {
      fontSize: 14,
      lineHeight: 1.9,
      color: '#C9C5BB',
      cursor: 'pointer'
    }
  }, item))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 24,
      borderTop: '1px solid #2F2F36',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: '#8C8881',
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 NOESIS MACHINES (PVT) LTD"), /*#__PURE__*/React.createElement("span", null, "MACHINES THAT KNOW."))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Hero — editorial, asymmetric. Display serif headline with italic accent.
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      padding: '120px 32px 80px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: 'var(--ink-3)'
    }
  }), "Deep AI \xB7 Colombo, Sri Lanka"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(56px, 8vw, 124px)',
      lineHeight: 1.0,
      letterSpacing: '-0.025em',
      margin: 0,
      maxWidth: '14ch'
    }
  }, "Machines that ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--clay)',
      fontStyle: 'italic'
    }
  }, "know.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      marginTop: 64,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      lineHeight: 1.5,
      color: 'var(--ink-2)',
      maxWidth: '52ch',
      margin: 0
    }
  }, "We build deep AI for the industries, languages, and realities of South Asia. Not API wrappers. Not repackaged generic models. Research-grade systems, calibrated to the domains they serve."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#work",
    style: {
      fontSize: 14,
      fontWeight: 500,
      padding: '12px 22px',
      background: 'var(--ink)',
      color: 'var(--bone)',
      borderRadius: 4,
      textDecoration: 'none'
    }
  }, "See our work \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#manifesto",
    style: {
      fontSize: 14,
      fontWeight: 500,
      padding: '12px 22px',
      background: 'transparent',
      color: 'var(--ink)',
      border: '1px solid var(--ink)',
      borderRadius: 4,
      textDecoration: 'none'
    }
  }, "Read the manifesto"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 96,
      paddingTop: 28,
      borderTop: '1px solid var(--mist)',
      display: 'flex',
      gap: 64,
      flexWrap: 'wrap',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Founders ex-Amazon \xB7 Amii \xB7 Bayer"), /*#__PURE__*/React.createElement("span", null, "Peer-reviewed \xB7 Patented IP"), /*#__PURE__*/React.createElement("span", null, "Fortune 500 deployments"))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ManifestoBlock.jsx
try { (() => {
// Manifesto block — dark section, big quote.
function ManifestoBlock() {
  return /*#__PURE__*/React.createElement("section", {
    id: "manifesto",
    className: "dark",
    style: {
      background: 'var(--ink)',
      color: 'var(--bone)',
      padding: '140px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 1080,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#8C8881',
      marginBottom: 40,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: '#8C8881'
    }
  }), "From the manifesto \xB7 \xA72"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(36px, 4.5vw, 64px)',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      margin: 0,
      color: 'var(--bone)'
    }
  }, "Noesis \u2014 from the Greek ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--tea)'
    }
  }, "noein"), ", to perceive or understand. Not pattern matching on surface features. Deep understanding \u2014 of domains, of data, of the real-world contexts our systems must navigate."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#8C8881'
    }
  }, "Founding principle, April 2026")));
}
window.ManifestoBlock = ManifestoBlock;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ManifestoBlock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
// Top navigation — sticky, hairline border, no shadow.
const {
  useState,
  useEffect
} = React;
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [{
    label: 'Work',
    href: '#work'
  }, {
    label: 'Research',
    href: '#research'
  }, {
    label: 'Manifesto',
    href: '#manifesto'
  }, {
    label: 'About',
    href: '#about'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(244,239,230,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--mist)' : '1px solid transparent',
      transition: 'all 180ms cubic-bezier(.22,1,.36,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '20px 32px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "30",
    height: "30",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 22,
      lineHeight: 1,
      letterSpacing: '-0.5px'
    }
  }, "Noesis"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 8.5,
      letterSpacing: '2.5px',
      fontWeight: 500,
      marginTop: 2
    }
  }, "M A C H I N E S"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flex: 1,
      marginLeft: 24
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i.label,
    href: i.href,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--ink-2)',
      textDecoration: 'none',
      transition: 'color .18s'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--ink)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--ink-2)'
  }, i.label))), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      background: 'var(--ink)',
      color: 'var(--bone)',
      padding: '10px 18px',
      borderRadius: 4,
      textDecoration: 'none'
    }
  }, "Talk to us \u2192")));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

})();
