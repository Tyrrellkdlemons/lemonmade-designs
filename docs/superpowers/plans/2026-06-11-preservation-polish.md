# LemonMade Preservation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the current LemonMade site, install the new logo across every brand surface, verify launch quality, and publish new public GitHub and Netlify projects.

**Architecture:** Keep the existing application architecture unchanged. Add a canonical brand-source directory, generate purpose-specific public image assets, centralize logo rendering in `LogoMark`, and validate the brand contract with Node's built-in test runner before production deployment.

**Tech Stack:** React 18, Vite 5, TypeScript, Tailwind CSS, Framer Motion, React Router, Node test runner, Netlify CLI, GitHub CLI

---

## File Map

- Create `brand/source/lemonmade-logo-original.png`: untouched canonical supplied logo.
- Create `tests/brand-assets.test.mjs`: brand source, derivative, and reference contract.
- Modify `package.json`: expose the Node test command.
- Replace files in `public/logo/`: optimized full logo, compact mark, and favicons.
- Replace `public/og/og-image.jpg`: new social preview.
- Modify `src/components/ui/LogoMark.tsx`: render compact or full brand variants.
- Modify `src/components/layout/Navbar.tsx`: readable compact navigation brand.
- Modify `src/components/layout/Footer.tsx`: use the new full brand treatment.
- Modify `src/components/ui/Hero.tsx`: use the complete supplied artwork prominently.
- Modify `src/pages/About.tsx`: use the complete supplied artwork.
- Modify `src/styles/index.css`: shared image blending and brand treatment.
- Modify `index.html`: metadata and responsive brand asset references.
- Modify `README.md`: verified local, GitHub, and Netlify workflow.
- Modify `public/robots.txt` and `public/sitemap.xml`: final production URL.
- Create `docs/upgrades/phase-c-redesign.md`: deferred redesign opportunities.

### Task 1: Brand Contract Test

- [ ] Add `npm test` using `node --test`.
- [ ] Write tests that require the canonical source hash and required derivative paths.
- [ ] Run `npm test` and confirm it fails because the new source and derivatives do not exist.
- [ ] Commit the failing contract test.

### Task 2: Canonical Source and Derivatives

- [ ] Copy the supplied logo byte-for-byte to `brand/source/lemonmade-logo-original.png`.
- [ ] Generate full, medium, compact mark, favicon, and Open Graph PNG derivatives.
- [ ] Verify dimensions, file sizes, and canonical source hash.
- [ ] Run `npm test` and confirm the asset portion passes.
- [ ] Commit the asset pipeline output.

### Task 3: Brand Component Integration

- [ ] Update `LogoMark` to support compact and full variants with responsive image attributes.
- [ ] Replace navigation, hero, footer, and About page placements.
- [ ] Add shared CSS that visually blends the full artwork into the navy page background.
- [ ] Update metadata references and accessible alt text.
- [ ] Run `npm test`, `npm run lint`, and `npm run build`.
- [ ] Commit the integration.

### Task 4: Targeted Quality Review

- [ ] Start the production preview.
- [ ] Inspect every route at desktop and mobile widths.
- [ ] Check internal navigation, mockup flow, forms, iframe fallback cards, keyboard focus, reduced motion, console output, and horizontal overflow.
- [ ] For each defect, add an automated regression check where practical, confirm it fails, apply the smallest fix, and rerun checks.
- [ ] Document deferred redesign opportunities in `docs/upgrades/phase-c-redesign.md`.
- [ ] Commit quality fixes and Phase C notes.

### Task 5: GitHub Publication

- [ ] Verify `git status` contains only intended files.
- [ ] Run the full test, lint, and build suite.
- [ ] Create public repository `Tyrrellkdlemons/lemonmade-designs`.
- [ ] Add the new repository as `origin` and push `main`.
- [ ] Verify the remote repository visibility and default branch.

### Task 6: Netlify Production Deployment

- [ ] Verify authenticated Netlify CLI state.
- [ ] Create and link a new Netlify site.
- [ ] Deploy a draft build and inspect the returned URL.
- [ ] Deploy production after the draft passes smoke checks.
- [ ] Update `robots.txt` and `sitemap.xml` to the actual production URL.
- [ ] Rebuild, commit, push, and deploy production again.
- [ ] Verify all routes, assets, and forms on the live site.

### Task 7: Final Verification

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Confirm a clean Git working tree.
- [ ] Confirm GitHub is public and `main` is pushed.
- [ ] Confirm the Netlify production URL responds successfully.
- [ ] Report URLs, verification evidence, iframe limitations, and Phase C location.
