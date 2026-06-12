# LemonMade Designs

**Websites Made Fresh.** A father-and-son web design company site built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

**Live site:** https://lemonmade-designs.netlify.app

**GitHub:** https://github.com/Tyrrellkdlemons/lemonmade-designs

## Pages

| Route | Purpose |
|---|---|
| `/` | Full-viewport brand hero, featured work, and capability shortcuts |
| `/work` | Live iframe previews with device toggles, category filters, and blocked-embed fallbacks |
| `/services` | 20 data-driven services with request, example, and mockup actions |
| `/request/:serviceId` | Service details plus a conditional Netlify request form |
| `/mockup-builder` | Live website preview, copyable brief, and Netlify submission |
| `/domain-help` | Public RDAP lookup, manual-help fallback, and domain request form |
| `/website-audit` | Free client-side audit checklist and review request |
| `/pricing` | 4 packages (Fresh Start, Business Made, LemonPro, Custom Build) + FAQ |
| `/process` | Animated 7-step timeline |
| `/about` | Father-and-son story |
| `/contact` | Main project request form (Netlify Forms) |

The legacy `/mockup` and `/domains` routes remain available as aliases.

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
4. Deploy. All seven Netlify Forms are detected from `public/__forms.html`, and the RDAP helper is deployed from `netlify/functions/`.

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
src/components/forms/         contact, service request, audit, and field components
src/components/mockup/        builder, live preview, summary, and options
netlify/functions/            credential-free server-side helpers
src/utils/                    netlifyForms, usePageMeta
```

## How service forms work

`src/data/services.ts` is the catalog used by `/services` and
`/request/:serviceId`. Each service selects a `formType`.
`src/data/serviceFormFields.ts` maps that type to the extra questions shown by
`ServiceRequestForm`.

All requests include the service ID, service title, source page, contact
information, timing, budget, message, and honeypot. Website redesigns submit to
`redesign-request`; management and maintenance submit to `management-request`;
other services submit to `service-request`.

## View submissions in Netlify

1. Open the `lemonmade-designs` project in Netlify.
2. Open **Forms**.
3. Select `start-project`, `service-request`, `mockup-builder`, `domain-help`,
   `website-audit`, `redesign-request`, or `management-request`.
4. Configure private email notifications under **Project configuration >
   Notifications > Form submission notifications**.

## Add a new service

1. Add one object to `src/data/services.ts` with a unique URL-safe `id`.
2. Reuse an existing `formType`, or add a typed field group in
   `src/data/serviceFormFields.ts`.
3. If new submitted field names were added, register them in the matching form
   inside `public/__forms.html`.
4. Run `npm test`, `npm run lint`, and `npm run build`.

## Test locally

Use `npm run dev` for UI work. Use `npx netlify dev` when testing Netlify Forms
or `/.netlify/functions/rdap-domain`, because the plain Vite server does not
emulate Netlify Functions.

## Free limitations

- RDAP reports public registration records; it cannot guarantee that a domain
  is purchasable or quote registrar pricing.
- Netlify Forms and Functions are subject to the active Netlify plan limits.
- The website audit is a guided request checklist, not a remote automated scan.
- Mockup previews are visual planning aids, not generated production websites.
- No payment, email automation, booking API, or AI API is enabled by default.

## Future paid upgrades

- Registrar availability and purchasing through an approved domain API.
- Resend transactional confirmations and customer follow-ups.
- Stripe deposits or package checkout with verified webhooks.
- Cal.com or another booking platform.
- OpenAI-powered scoped project assistance behind a server-side Function.
- Authenticated client portals, file storage, and private project status.

## Notes

- **Iframes:** lazy-loaded via IntersectionObserver; sites that block embedding (`X-Frame-Options`/CSP) show Claude's saved screenshot plus live-site and similar-site actions.
- **Reduced motion:** all animations soften/disable under `prefers-reduced-motion`.
- **Forms:** seven Netlify Forms with honeypots, client validation, accessible errors, first-error focus, and duplicate-submit protection.
- **Domains:** public RDAP lookup uses no API key and never presents LemonMade as a registrar.
- **No credentials** are stored anywhere in this repo.
- **Integrations:** current service status and optional API setup are documented in `docs/INTEGRATIONS.md`.

## Deferred redesign

The larger Phase C redesign backlog is documented in `docs/upgrades/phase-c-redesign.md`.
