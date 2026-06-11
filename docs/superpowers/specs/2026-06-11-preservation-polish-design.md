# LemonMade Preservation Polish Design

## Objective

Preserve the existing LemonMade Designs site structure, copy, routes, forms, portfolio data, and interaction model while replacing the complete brand asset set with the newly supplied logo artwork and correcting quality issues that affect launch readiness.

## Preservation Boundary

- Keep all existing public routes and page purposes.
- Keep the current React, Vite, TypeScript, Tailwind CSS, Framer Motion, and React Router stack.
- Keep the current service, pricing, project, FAQ, process, and form content unless a small correction is required for accuracy or accessibility.
- Keep all current Netlify Forms names and field contracts.
- Keep a recoverable Git commit of the original implementation.
- Do not perform the larger Phase C redesign in this pass.

## File Organization

- Store the untouched supplied logo in `brand/source/`.
- Store browser-ready derivatives in `public/logo/` and `public/og/`.
- Keep application code under the existing `src/` boundaries.
- Keep deployment helpers under `scripts/`.
- Move loose workspace logo files into a clearly named archival folder only after the tracked source copy and hashes are verified.

## Brand Asset Strategy

The supplied image remains unchanged as the canonical source. Derivatives are created only where the original 1536 by 1024 artwork is unsuitable:

- Full optimized logo for hero, About, and prominent brand moments.
- Compact square brand mark cropped from the same artwork for navigation and favicons.
- Social preview image sized for Open Graph sharing.
- Responsive image sizing so large artwork is not downloaded at unnecessary dimensions.

The hero and large placements use the complete supplied artwork whenever practical. Compact placements use the derived mark because the complete lockup is unreadable at navigation and favicon sizes.

## Visual Polish

- Preserve the existing navy, lemon, blue, green, and cream palette.
- Blend the full logo naturally into the dark hero instead of presenting it as a pasted rectangular image.
- Give the navigation a legible compact mark plus text lockup.
- Keep motion restrained and compatible with reduced-motion preferences.
- Correct spacing, image sizing, and mobile overflow only where inspection shows a defect.

## Functional Verification

- Add a lightweight automated brand contract test using Node's built-in test runner.
- Verify required logo files, image dimensions, source hash, HTML metadata references, and component references.
- Run TypeScript checks and the production build.
- Inspect all routes at desktop and mobile widths in the browser.
- Check navigation, forms, mockup flow, portfolio fallback behavior, console errors, overflow, and broken internal links.

## Deployment

- Create a new public GitHub repository named `lemonmade-designs`.
- Push the verified `main` branch.
- Create a new Netlify site, preferring the name `lemonmade-designs` and using the nearest available name only if the global site name is unavailable.
- Deploy the production build through the authenticated Netlify CLI.
- Replace placeholder sitemap and robots URLs with the actual production URL, then rebuild and redeploy.
- Do not expose authentication tokens, private dashboard data, or local source paths.

## Phase C Upgrade Boundary

Phase C is a future redesign pass. It may reconsider page composition, introduce route-level code splitting, add project screenshots, improve the quote flow, and redesign high-value conversion sections. Those changes are intentionally excluded from this preservation-polish launch.

## Success Criteria

- The original supplied logo is preserved byte-for-byte in the repository.
- Every visible brand placement uses the new artwork or a necessary derivative.
- Existing routes, forms, and portfolio behavior remain available.
- Automated checks and production build pass.
- Browser QA shows no console errors or horizontal overflow on representative desktop and mobile viewports.
- A new public GitHub repository and a live Netlify production deployment exist.
