# LemonMade Designs

**Websites Made Fresh.** A father-and-son web design company site built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

**Live site:** https://lemonmade-designs.netlify.app

**GitHub:** https://github.com/Tyrrellkdlemons/lemonmade-designs

## Pages

| Route | Purpose |
|---|---|
| `/` | Full-viewport brand hero, featured work, and capability shortcuts |
| `/work` | Live iframe previews with device toggles, category filters, and blocked-embed fallbacks |
| `/services` | 20 service cards, each with a "Request this" link |
| `/mockup` | Interactive mockup builder, summary card, and Netlify Forms submission |
| `/domains` | Domain help panel + request form + plain-English education cards |
| `/pricing` | 4 packages (Fresh Start, Business Made, LemonPro, Custom Build) + FAQ |
| `/process` | Animated 7-step timeline |
| `/about` | Father-and-son story |
| `/contact` | Main project request form (Netlify Forms) |

## Run locally

```bash
npm ci
npm run dev        # http://localhost:5173
```

## Build

```bash
npm test
npm run lint
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Brand assets

The untouched supplied logo and approved transparent masters are stored in
`brand/source/`. Browser-ready PNG and favicon derivatives are generated with:

```powershell
.\scripts\generate-brand-assets.ps1
```

The script deliberately keeps the approved cutout, compact mark, and social card
as masters so future regeneration cannot reintroduce the original rectangular
background.

## Deploy to Netlify

**Option A — Git-connected (recommended):**
1. Push this repo to GitHub (see scripts below).
2. In Netlify: *Add new project → Import an existing project* → pick the repo.
3. Build command: `npm run build` · Publish directory: `dist` (already in `netlify.toml`).
4. Deploy. Netlify Forms (`start-project`, `mockup-builder`, `domain-help`) are detected from `public/__forms.html`.

**Option B — Netlify CLI:**
```bash
npx netlify deploy --build --prod
```

## Windows helper scripts (`scripts/`)

- `setup-github-netlify.cmd` — menu: install, build, git init/push, Netlify instructions or CLI deploy
- `push-only.cmd` — test + type-check + build + status + commit + confirm before push
- `deploy-check.cmd` — clean install + test + type-check + build + output/config sanity checks
- `deploy-now.cmd` — deploy-note guard + push + Netlify production deploy watch

All scripts pause before closing.

## Structure

```
brand/source                  untouched original and approved transparent masters
public/logo, public/og        optimized public brand assets
src/data/                     projects, services, pricing, faqs (data-driven)
src/components/layout/        Navbar, Footer, Layout (page transitions, skip link)
src/components/animations/    background, reveal, cursor, badge, and scroll-progress motion
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
- **Integrations:** current service status and optional API setup are documented in `docs/INTEGRATIONS.md`.

## Deferred redesign

The larger Phase C redesign backlog is documented in `docs/upgrades/phase-c-redesign.md`.
