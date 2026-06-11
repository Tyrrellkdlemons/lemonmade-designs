# Phase C Redesign Upgrades

Phase C is intentionally separate from the preservation-polish launch. It can change composition and architecture after the live baseline is stable.

## Recommended Priorities

1. Add route-level code splitting to reduce the initial JavaScript bundle.
2. Replace iframe-first portfolio cards with optimized screenshots and load live previews on demand.
3. Redesign the hero and conversion sections through structured A/B concepts.
4. Add a real quote workflow with saved requests and project status tracking.
5. Add client login, support tickets, maintenance plans, and secure file uploads.
6. Integrate domain lookup and payment providers only after credentials and business rules are approved.
7. Upgrade Vite and related build tooling as a dedicated compatibility task.
8. Add automated browser tests for critical forms and navigation.

## Guardrails

- Preserve the current public URLs and SEO value.
- Keep the new canonical logo source unchanged.
- Prototype visual directions before replacing live layouts.
- Ship upgrades in independently testable stages.
