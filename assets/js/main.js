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
  -------------------------------------------------------- */
  const COVERED = new Set(['USTX', 'USOK', 'USLA', 'USMS', 'USCO', 'USFL']);

  function recolorMap(svgDoc, host) {
    if (!svgDoc) return;
    const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
      path[id^="US"] { fill: #E8E1D6 !important; transition: fill 0.15s ease; }
      path[id="USTX"], path[id="USOK"], path[id="USLA"],
      path[id="USMS"], path[id="USCO"], path[id="USFL"] { fill: #A6432A !important; stroke: #FBF8F3 !important; stroke-width: 0.8 !important; }
      path[id="USTX"]:hover, path[id="USOK"]:hover, path[id="USLA"]:hover,
      path[id="USMS"]:hover, path[id="USCO"]:hover, path[id="USFL"]:hover { fill: #C97C5D !important; }
      path[id="USAK"] { fill: #D9D0C2 !important; opacity: 0.4; }
    `;
    const svgRoot = svgDoc.documentElement;
    svgRoot.insertBefore(style, svgRoot.firstChild);
    host.classList.add('us-map-loaded');
  }

  document.querySelectorAll('object.us-map-object').forEach(function (obj) {
    obj.addEventListener('load', function () {
      try { recolorMap(obj.contentDocument, obj.parentElement); }
      catch (e) { /* cross-origin or not loaded — fall back to default fill */ }
    });
  });
})();