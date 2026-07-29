/* ============================================================
   Tradition Sales — Main JS
   Handles: mobile nav toggle, contact form track switching,
   form validation feedback, smooth scroll for in-page anchors.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('show');
      mobileNav.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('show');
        mobileNav.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- Contact form: track toggle ---------- */
  const trackButtons = document.querySelectorAll('.track-btn');
  const forms = document.querySelectorAll('.contact-form');

  trackButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.dataset.track;

      trackButtons.forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      forms.forEach(function (f) {
        f.classList.toggle('hidden', f.dataset.track !== target);
      });
    });
  });

  /* ---------- Form submission placeholder ----------
     Squarespace handles the actual form POST.
     This is a client-side validation enhancement only.
  -------------------------------------------------------- */
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      // Native validation first
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      // Let Squarespace take over from here.
      // Optional: add a "Sending..." state on the button.
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
    });
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y > 8) header.style.boxShadow = '0 2px 12px rgba(31,26,23,0.06)';
      else header.style.boxShadow = 'none';
      lastScroll = y;
    }, { passive: true });
  }

  /* ---------- Map state hover → show name ---------- */
  document.querySelectorAll('.map-state').forEach(function (g) {
    const label = g.querySelector('.map-label');
    if (label) {
      g.addEventListener('mouseenter', function () { label.style.fill = 'var(--c-charcoal)'; });
      g.addEventListener('mouseleave', function () { label.style.fill = 'var(--c-cream)'; });
    }
  });

  /* ---------- Recolor US map SVG once loaded ----------
     The Simplemaps SVG uses fill="#6f9c76" for all states. After load,
     inject a <style> tag that recolors non-covered states to muted bone,
     and covered states (TX, OK, LA, MS, CO, FL) to the brand rust.
     Hovering covered states brightens to clay.
     Adds overlay state labels for covered states at SVG-native coords
     so they don't depend on CSS overlay positioning.
  -------------------------------------------------------- */
  const COVERED = new Set(['USTX', 'USOK', 'USLA', 'USMS', 'USCO', 'USFL']);
  // Approximate state label anchors in the Simplemaps SVG viewBox (1000 x 559 with AK/HI insets).
  // These were measured from the rendered map, not parsed from path data.
  // Simplemaps SVG viewBox is 1000 x 259. AK/HI are insets in the left area
  // (x ~0-200). The 48 contiguous states fill roughly x=350-1000, y=20-220.
  // Label anchors below were calibrated from path centroids + visual offset.
  const LABEL_POS = {
    USTX: { x: 475, y: 135 },
    USOK: { x: 500, y: 110 },
    USLA: { x: 555, y: 165 },
    USMS: { x: 600, y: 145 },
    USCO: { x: 380, y: 100 },
    USFL: { x: 770, y: 200 },
  };
  const SHORT_LABEL = { USTX: 'TX', USOK: 'OK', USLA: 'LA', USMS: 'MS', USCO: 'CO', USFL: 'FL' };

  function recolorMap(svgDoc, host) {
    if (!svgDoc) return;
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const style = svgDoc.createElementNS(SVG_NS, 'style');
    style.textContent = `
      path[id^="US"] { fill: #E8E1D6 !important; transition: fill 0.18s ease; stroke: #FFFFFF; stroke-width: 0.4; }
      path[id="USTX"], path[id="USOK"], path[id="USLA"],
      path[id="USMS"], path[id="USCO"], path[id="USFL"] { fill: #A6432A !important; stroke: #FBF8F3 !important; stroke-width: 0.8 !important; }
      path[id="USTX"]:hover, path[id="USOK"]:hover, path[id="USLA"]:hover,
      path[id="USMS"]:hover, path[id="USCO"]:hover, path[id="USFL"]:hover { fill: #C97C5D !important; }
      path[id="USAK"] { fill: #D9D0C2 !important; opacity: 0.4; }
      path[id="USHI"] { fill: #D9D0C2 !important; opacity: 0.4; }
      .ts-state-label {
        font-family: Georgia, 'Fraunces', serif;
        font-weight: 600;
        font-size: 22px;
        fill: #FBF8F3;
        text-anchor: middle;
        pointer-events: none;
        paint-order: stroke;
        stroke: #1F1A17;
        stroke-width: 3;
        stroke-linejoin: round;
      }
    `;
    const svgRoot = svgDoc.documentElement;
    svgRoot.insertBefore(style, svgRoot.firstChild);

    // Append SVG-native labels for covered states
    Object.keys(LABEL_POS).forEach(function (id) {
      const pos = LABEL_POS[id];
      const text = svgDoc.createElementNS(SVG_NS, 'text');
      text.setAttribute('x', pos.x);
      text.setAttribute('y', pos.y);
      text.setAttribute('class', 'ts-state-label');
      text.setAttribute('id', 'ts-label-' + id);
      text.textContent = SHORT_LABEL[id];
      svgRoot.appendChild(text);
    });

    host.classList.add('us-map-loaded');
  }

  document.querySelectorAll('object.us-map-object').forEach(function (obj) {
    obj.addEventListener('load', function () {
      try { recolorMap(obj.contentDocument, obj.parentElement); }
      catch (e) { console.error('Map recolor failed:', e); }
    });
    // Also try immediately in case load already fired (cached)
    setTimeout(function() {
      try { recolorMap(obj.contentDocument, obj.parentElement); }
      catch (e) { /* ignore */ }
    }, 100);
  });
})();