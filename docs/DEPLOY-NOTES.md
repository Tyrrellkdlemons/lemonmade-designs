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
