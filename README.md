# LemonMade Designs 🍋

**Websites Made Fresh.** A father-and-son web design company site — built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Netlify-ready.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, mini process, featured work, services teaser, trust statement |
| `/work` | Live iframe previews with device toggles, category filters, and blocked-embed fallbacks |
| `/services` | 20 service cards, each with a "Request this" link |
| `/mockup` | Interactive mockup builder → summary card → Netlify Forms submission |
| `/domains` | Domain help panel + request form + plain-English education cards |
| `/pricing` | 4 packages (Fresh Start, Business Made, LemonPro, Custom Build) + FAQ |
| `/process` | Animated 7-step timeline |
| `/about` | Father-and-son story |
| `/contact` | Main project request form (Netlify Forms) |

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Deploy to Netlify

**Option A — Git-connected (recommended):**
1. Push this repo to GitHub (see scripts below).
2. In Netlify: *Add new project → Import an existing project* → pick the repo.
3. Build command: `npm run build` · Publish directory: `dist` (already in `netlify.toml`).
4. Deploy. Netlify Forms (`start-project`, `mockup-builder`, `domain-help`) are detected automatically from the hidden forms in `index.html`.

**Option B — Netlify CLI:**
```bash
netlify deploy --build --prod
```

## Windows helper scripts (`scripts/`)

- `setup-github-netlify.cmd` — menu: install, build, git init/push, Netlify instructions or CLI deploy
- `push-only.cmd` — build → status → commit → confirm before push
- `deploy-check.cmd` — install + build + output/config sanity checks

All scripts pause before closing.

## Structure

```
public/logo, public/og        optimized brand assets
src/data/                     projects, services, pricing, faqs (data-driven)
src/components/layout/        Navbar, Footer, Layout (page transitions, skip link)
src/components/animations/    AnimatedBackground, ScrollReveal, FloatingLemons, AnimatedLemonCodeBadge
src/components/ui/            Button, Hero, ServiceCard, PricingCard, CTASection, FAQAccordion, ProcessTimeline, DomainHelpPanel, LogoMark, SectionHeading
src/components/portfolio/     ProjectPreviewCard, IframePreview, IframeFallback, DevicePreviewToggle
src/components/forms/         ContactForm, FormField
src/components/mockup/        MockupBuilderForm, MockupSummaryCard, mockupOptions
src/utils/                    netlifyForms, usePageMeta
```

## Notes

- **Iframes:** lazy-loaded via IntersectionObserver; sites that block embedding (`X-Frame-Options`/CSP) automatically show a fallback card with "Open Live Site" and "Use This as Inspiration".
- **Reduced motion:** all animations soften/disable under `prefers-reduced-motion`.
- **Forms:** honeypot spam protection + client validation + accessible errors.
- **No credentials** are stored anywhere in this repo.

## After updating the live-site domain

Update `public/robots.txt` and `public/sitemap.xml` with your final domain.
