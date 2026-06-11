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
