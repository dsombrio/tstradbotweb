# Tradition Sales — Website Demo

A modern, mobile-first site for Tradition Sales, LLC. This repo is the **GitHub Pages preview / design reference**. The actual production site lives in Squarespace — instructions below for porting each section.

## Pages

| URL | Purpose |
|-----|---------|
| `/index.html` | Homepage — primary entry for manufacturers and existing customers |
| `/manufacturers.html` | Sales pitch to manufacturers (principal audience) |
| `/line-card.html` | Full brand catalog by category |
| `/team.html` | Rep directory + territory map |
| `/about.html` | Owner story + values |
| `/contact.html` | Dual-track form (manufacturer vs. dealer/builder) |

## File Structure

```
tradition-sales-site/
├── index.html              # Homepage
├── manufacturers.html      # For Manufacturers page
├── line-card.html          # Line Card page
├── team.html               # Team & Coverage page
├── about.html              # About page
├── contact.html            # Contact page
├── assets/
│   ├── css/style.css       # Complete design system (single file)
│   ├── js/main.js          # Mobile nav, form toggle, scroll behavior
│   └── img/brands/         # Brand logo SVGs (placeholders — swap for real)
└── README.md               # This file
```

## Design System

- **Colors:** warm industrial palette — burnt sienna `#A6432A` (rust), charcoal `#1F1A17`, bone `#F4EFE8`
- **Type:** Fraunces (display serif) + Inter (UI)
- **Spacing scale:** `--s-1` through `--s-9` (4px → 96px)
- **Breakpoints:** 960px (tablet) and 720px (mobile)

All design tokens live as CSS custom properties in `assets/css/style.css` at the top. Match these to Squarespace's "Site Styles" panel where possible.

---

## Squarespace Port Instructions

### 1. Plan & Editor
Target plan: **Business or Commerce** (Fluid Engine). Legacy editor users: the structure still works but some blocks (e.g. dual-column hero) will require the modern editor.

### 2. Site Styles (Settings → Site Styles)
Set in Site Styles to match the design system:
- **Colors:** Load custom palette — Primary: `#A6432A`, Background: `#FBF8F3`, Text: `#1F1A17`
- **Fonts:** Heading: Fraunces (or fallback `playfair-display`), Body: Inter
- **Spacing:** Default Squarespace values are close enough; adjust if gaps look off
- **Buttons:** Rounded radius (4px), rust fill, cream text

### 3. Build the Pages — Section by Section

Every section in the HTML files is tagged with a comment like:
```
<!-- SECTION: HERO
  Squarespace: Full-bleed banner section with text overlay (left-aligned)
  Build note: Replace background with high-res photo...
-->
```

This is your build map. For each section, use the matching Squarespace block.

#### Homepage (`index.html`)
| Demo Section | Squarespace Block | Notes |
|--------------|-------------------|-------|
| Top Nav | Header (sticky) | Add nav links: For Manufacturers, Line Card, Team & Coverage, About, Contact |
| Hero | Banner (full-bleed) | Headline + sub + 2 buttons. Background: jobsite or brand wall photo |
| Stats Bar | Solid color section with 4 text blocks | Custom code block if needed |
| For Manufacturers | Two-column: text left, quote card right | Use Image + Text blocks |
| Brand Wall | Logo strip block on light bg | Replace each logo with the real brand's official logo |
| Categories | Grid of 7 cards | Use Card block × 7 |
| Coverage | Two-column: text + map | Use Image block for the SVG map or replace with image |
| Team Teaser | 5-card grid | Replace initial placeholders with rep headshots |
| Dual CTA | Two-column section, contrasting bg | Buttons styled as primary/secondary |
| Footer | Footer with link groups | Match the 3-column structure |

#### Manufacturers page (`manufacturers.html`)
- Hero, then "Why us" two-column, then "How we work" 4-step process, then category pills, then final CTA.

#### Line Card page (`line-card.html`)
- Hero, then 6 stacked category sections. Each category = heading + 1-2 brand cards. Use Squarespace's "List Section" or build with Text blocks + a custom HTML embed per brand.

#### Team page (`team.html`)
- Hero, then 5 rep cards in single column (each card = photo + name + role + territory + email). Then coverage map. Then final CTA.

#### About page (`about.html`)
- Hero, then "Owner story" two-column with bio + owner card sidebar. Then "Values" 3-column grid. Then final CTA.

#### Contact page (`contact.html`)
- Hero, then 2-column with contact info aside on left + form on right. **The form uses a track toggle** (manufacturer / customer). This is best built as a custom HTML block in Squarespace or two separate Forms that swap via a Code Block + small JS.

### 4. Forms

**Manufacturer form** — Squarespace form with these fields:
- First Name (required, text)
- Last Name (required, text)
- Email (required, email)
- Company (required, text)
- Website (url, optional)
- Product Category (required, dropdown: Windows & Doors, Door Parts & Hardware, Roofing Materials, Bath & Kitchen, Cabinet Hardware, Closet Systems, Millwork & Columns, Other)
- Message (required, textarea)

**Customer form** — Squarespace form with these fields:
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Company / Yard (required)
- ZIP code (required)
- Message (optional)

The track toggle is a small JS snippet — embed via Code Block. Demo JS is in `assets/js/main.js`.

### 5. SEO

Each page has its own:
- `<title>` (page-specific, 50–60 chars)
- `<meta name="description">` (page-specific, 150–160 chars)
- `<link rel="canonical">` (production URL)

Squarespace's per-page SEO panel handles all of this. Copy values from each HTML file's `<head>`.

Homepage has structured data (`LocalBusiness` JSON-LD) — for Squarespace, paste this into Settings → Advanced → Code Injection → Header (page-specific: only on homepage).

### 6. Image Sourcing — TODO Before Launch

The demo uses text-only logo placeholders for brands. Before going live, swap each `/assets/img/brands/*.svg` with the actual manufacturer's official logo. **Permission required** — for Lindsay Windows, Worldwide Door Components, and ClosetMaid Pro, keep them as text-only (no logo) per the brand permission matrix.

Photos needed:
- Hero background — jobsite, lumber yard, or brand wall (recommend hiring a local photographer, or use a stock image from a service like Unsplash for testing)
- Rep headshots — for each of the 5 reps
- Owner portrait — for the About page
- Optional: jobsite, dealer counter, or multi-family build photos for category cards

### 7. Performance + Security

- All fonts loaded from Google Fonts via `<link rel="preconnect">` for speed.
- No external scripts — only self-hosted `assets/js/main.js`.
- No tracking pixels in the demo. Add Google Analytics or Plausible via Squarespace's Code Injection when ready.
- HTTPS enforced (Squarespace default).

### 8. Launch Checklist

- [ ] Replace all SVG brand logos with real artwork
- [ ] Add real photos (hero, reps, owner)
- [ ] Update all `<a href="tel:...">` and `<a href="mailto:...">` with confirmed numbers
- [ ] Connect Squarespace form to HubSpot or email forwarding
- [ ] Set up 301 redirects from old `traditionsales.com` URLs if structure changes
- [ ] Submit updated sitemap to Google Search Console
- [ ] Verify mobile rendering on real devices (iPhone Safari, Android Chrome)
- [ ] Add Google Business Profile link in footer (recommended for local SEO)

---

## Preview Locally

Open `index.html` in any browser, or serve it:

```bash
cd tradition-sales-site
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## License & Ownership

All code, copy, and design in this repo is custom-built for Tradition Sales, LLC. Brand logos are placeholder wordmarks — replace with licensed brand artwork before public launch.