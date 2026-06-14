# Estimator and Workflow Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete LemonMade's quote estimator, service pricing, mockup/review upgrades, lead workflow, and eighth Netlify form without replacing existing working flows.

**Architecture:** A pure estimator module owns all price calculations. Service, estimate, and mockup UIs consume that shared logic. Static service data and Netlify form blueprints remain the persistence and submission contracts.

**Tech Stack:** React 18, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, Netlify Forms, Node test runner.

---

### Task 1: Estimator Contract and Formula

**Files:**
- Create: `src/data/estimatorLogic.ts`
- Create: `tests/estimator-logic.test.mjs`

- [ ] Write tests that import `calculateEstimate()` and verify:
  - Landing base equals `$299-$599`.
  - Small business base equals `$799-$1,499`.
  - Premium base equals `$1,499-$2,999`.
  - E-commerce, animations, booking/payment, and domain help increase both ends.
  - Extra pages and design complexity increase both ends.
  - Rush multiplies both ends by `1.25`.
  - Monthly management returns `From $99/mo`.
- [ ] Run `node --test tests/estimator-logic.test.mjs` and confirm it fails because the module is missing.
- [ ] Implement exported `calculateEstimate`, `formatEstimateRange`,
  `packageForServiceId`, and `estimateFromMockup` functions with explicit types.
- [ ] Re-run the estimator tests and confirm they pass.

### Task 2: Service Price and Timeline Metadata

**Files:**
- Modify: `src/data/services.ts`
- Modify: `src/components/ui/ServiceCard.tsx`
- Modify: `src/pages/ServiceRequest.tsx`
- Modify: `src/components/forms/ServiceRequestForm.tsx`
- Modify: `tests/service-platform.test.mjs`

- [ ] Add failing source-contract tests for `startingPrice`, `priceRange`,
  `timelineEstimate`, `estimatedRange`, and Estimate links.
- [ ] Run the targeted service-platform tests and confirm the new assertions fail.
- [ ] Add all three fields to `Service` and populate all 20 entries.
- [ ] Render price/timeline on service cards and request pages.
- [ ] Add `Get Estimate` links to cards and request next steps.
- [ ] Submit `estimatedRange: service.priceRange` from every service form.
- [ ] Re-run targeted tests and confirm they pass.

### Task 3: Estimate Page and Form

**Files:**
- Create: `src/pages/Estimate.tsx`
- Modify: `src/App.tsx`
- Modify: `public/__forms.html`
- Modify: `tests/service-platform.test.mjs`

- [ ] Add failing tests for `/estimate`, query prefill, required disclaimer,
  four actions, `project-estimate`, and its submitted fields.
- [ ] Run targeted tests and confirm failure.
- [ ] Build a responsive controlled estimator form with immediate calculation,
  clipboard copy, validation, Netlify submission, sending/error/success states,
  and service query prefill.
- [ ] Register every estimator field in `public/__forms.html`.
- [ ] Re-run targeted tests and confirm pass.

### Task 4: Mockup Completion

**Files:**
- Modify: `src/components/mockup/mockupOptions.ts`
- Modify: `src/components/mockup/MockupBuilderForm.tsx`
- Modify: `src/components/mockup/MockupSummaryCard.tsx`
- Modify: `src/pages/MockupBuilder.tsx`
- Modify: `tests/service-platform.test.mjs`

- [ ] Add failing tests for 12 styles, 12 pages, 14 or more features, Save Draft
  Locally, Reset, quote-based copy, suggested package, and estimated range.
- [ ] Run targeted tests and confirm failure.
- [ ] Expand the option lists without removing existing choices.
- [ ] Add explicit save and reset controls with accessible status feedback.
- [ ] Reuse `estimateFromMockup` in the summary and copy text.
- [ ] Remove "free, no commitment" copy.
- [ ] Re-run targeted tests and confirm pass.

### Task 5: Starter Website Review

**Files:**
- Modify: `src/components/forms/WebsiteAuditForm.tsx`
- Modify: `src/pages/WebsiteAudit.tsx`
- Modify: `public/__forms.html`
- Modify: `tests/service-platform.test.mjs`

- [ ] Add failing tests for Starter Website Review copy, business type,
  per-area concerns, ten checklist categories, and expanded blueprint fields.
- [ ] Run targeted tests and confirm failure.
- [ ] Add business type and `areaConcerns` controls to the submitted form.
- [ ] Expand the checklist to Mobile, Speed, SEO, SSL/domain, Contact forms,
  Brand clarity, CTA clarity, Accessibility, Content structure, Trust signals.
- [ ] Replace free/audit framing with review/quote wording while retaining the
  transparent no-automated-scan explanation.
- [ ] Re-run targeted tests and confirm pass.

### Task 6: Lead Workflow and Navigation

**Files:**
- Create: `src/pages/LeadWorkflow.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `public/sitemap.xml`
- Modify: `tests/service-platform.test.mjs`

- [ ] Add failing tests for `/lead-workflow` and linked Services, Request,
  Mockup, Estimate, Submit, and Follow-up stages.
- [ ] Run targeted tests and confirm failure.
- [ ] Build the responsive workflow page using existing glass, motion, Button,
  and SectionHeading patterns.
- [ ] Add the route, footer discovery link, and sitemap entries for Estimate and
  Lead Workflow.
- [ ] Re-run targeted tests and confirm pass.

### Task 7: Forms and Documentation

**Files:**
- Modify: `public/__forms.html`
- Modify: `README.md`
- Modify: `docs/INTEGRATIONS.md`
- Modify: `docs/DEPLOY-NOTES.md`
- Modify: `scripts/deploy-check.cmd`
- Modify: `tests/service-platform.test.mjs`

- [ ] Add failing tests requiring eight form blueprints and updated operations
  documentation.
- [ ] Run targeted tests and confirm failure.
- [ ] Ensure every React payload field has a matching static blueprint field.
- [ ] Document submission locations, notifications, local testing, safe field
  additions, estimate logic, and the no-n8n decision.
- [ ] Update deploy checks and release notes.
- [ ] Re-run targeted tests and confirm pass.

### Task 8: Full Verification and Release

**Files:**
- Verify all changed files.

- [ ] Run `npm install`.
- [ ] Run `npm test`, `npm run lint`, `npm run build`, `git diff --check`, and
  `npm audit --omit=dev`.
- [ ] Run local browser QA at mobile, tablet, laptop, and desktop widths.
- [ ] Verify all primary routes, aliases, form validation, estimator math,
  mockup save/reset, review checklist, and RDAP lookup.
- [ ] Commit the implementation and push `main`.
- [ ] Wait for Netlify production deploy and verify its commit, routes, eight
  forms, and RDAP function.

