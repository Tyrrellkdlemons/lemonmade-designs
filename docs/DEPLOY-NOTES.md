# Deploy Notes — LemonMade Designs

Every production deploy gets an entry here **and** a matching git commit message
(the commit message becomes the deploy title in the Netlify dashboard).
`scripts/push-only.cmd` prompts for the note automatically before each push.

Format:

```
## YYYY-MM-DD — Short title
- What changed
- Why
- Anything to verify after deploy
```

---

## 2026-06-14 — feat: complete quote estimator workflow
- Added service starting prices, project ranges, and timeline estimates across
  all 20 service records, cards, and request pages.
- Added `/estimate` with deterministic client-side pricing, service query
  prefill, copy support, Netlify submission, and the required pricing disclaimer.
- Added `/lead-workflow`, expanded mockup options and local draft controls, and
  upgraded the website audit into a quote-based Starter Website Review.
- Added the eighth Netlify Form, `project-estimate`, and registered every new
  service, mockup, estimate, and website-review payload field.
- Kept the workflow free to operate with static data, localStorage, Netlify
  Forms, and RDAP. n8n is intentionally deferred until a real CRM/email/task
  orchestration requirement exists.
- Verify after deploy: eight forms registered, estimate query prefill and math,
  mockup save/reset, ten review categories, workflow links, responsive layouts,
  and the existing RDAP and portfolio fallbacks.

## 2026-06-12 — feat: launch free service request platform
- Preserved Claude's real portfolio preview release on the remote
  `checkpoint/claude-ebf2fd5` branch before beginning this platform work.
- Turned all 20 service cards into working request, example, and quick-mockup
  entry points backed by a typed service catalog.
- Added dynamic `/request/:serviceId` pages with shared contact fields,
  service-specific conditional questions, accessible validation, and dedicated
  redesign/management form routing.
- Added canonical `/mockup-builder`, `/domain-help`, and `/website-audit`
  workflows while retaining the previous `/mockup` and `/domains` aliases.
- Added a credential-free RDAP Netlify Function, live animated mockup preview,
  client-side audit checklist, and all seven static Netlify Form declarations.
- Verify after deploy: all seven forms are registered, RDAP returns public data,
  every service ID resolves, mobile cards/forms do not overflow, and portfolio
  preview fallbacks still use Claude's saved screenshots.

## 2026-06-11 — Real previews on every Our Work card
- Verified all 10 portfolio sites' embedding headers. 5 allow live iframes
  (Indulging Treats, PacificSide, Justice Education, Safe Haven, Mable's Home);
  5 block embedding via X-Frame-Options/CSP (OTM Workshops, LoveRebel, Erebus TK,
  Purely Gems, Success Stories) — flags corrected to match reality.
- Captured real screenshots of all 10 live sites (public/images/previews/).
  Blocked sites now show their actual screenshot with "Open Live Site" overlay
  instead of a generic skeleton; embeddable sites use the screenshot as the
  loading placeholder behind the iframe.
- Optional next step: the blocked Netlify sites are our own projects — adding
  `frame-ancestors https://lemonmade-designs.netlify.app` to their headers would
  enable true live embeds.


## 2026-06-11 — feat: finish animated LemonMade launch
- Finished Claude's visual handoff with a mobile-first hero composition, visible
  first-screen calls to action, active navigation motion, scroll progress, card
  sweeps, icon movement, and richer section/CTA animation.
- Hardened all forms against duplicate submissions, focused the first invalid
  field for keyboard users, and made contact query-prefills update without a
  full route change.
- Replaced the private Purely Gems dashboard URL with its public live site.
- Preserved transparent brand masters and repaired the asset-generation and
  deployment scripts so they cannot restore the retired JPEG logo treatment.
- Added integration setup guidance for form notifications, booking, email,
  payments, domain lookup, AI assistance, analytics, and uploads.
- Verify after deploy: mobile hero/scroll cue, all three Netlify Forms, public
  portfolio links, favicon/social card, and reduced-motion behavior.

## 2026-06-11 — Brand cutout, fresh fonts, lemon buttons, decongested home
- New mascot logo cut out with true transparency — no more rectangle behind the
  hero art, navbar mark, or favicon. New files: `lemonmade-logo-full.png`,
  `lemonmade-logo-720.png`, `lemonmade-logo-mark.png`, `og-card.png`.
- Hero is now full-viewport with an animated "scroll" indicator; floating logo art.
- Home decongested: services grid and mini-process moved off the homepage
  (services live on /services; process timeline + trust quote now on /about).
- Navigation condensed: Process and Domains removed from the navbar (still
  routable; linked from footer, home capability strip, and About).
- New typography: Baloo 2 (display) + Plus Jakarta Sans (body).
- New lemon-shaped buttons with leaf accent, candy depth, and shine.
- Custom lemon cursor + glow trail (desktop only) and designed lemon scrollbar.
- Verify after deploy: hero art transparency, favicon, forms still registered,
  /work iframe fallbacks, mobile nav.

## 2026-06-11 — Preservation polish (Codex)
- New brand system applied, files organized, forms registration via
  `__forms.html`, accessibility heading structure, initial GitHub + Netlify setup.
