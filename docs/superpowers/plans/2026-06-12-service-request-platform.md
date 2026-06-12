# LemonMade Service Request Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every LemonMade service configurable and submit-ready through free React and Netlify workflows.

**Architecture:** A typed service catalog drives cards and dynamic request pages. Shared form primitives render service-specific fields, existing mockup/domain pages are upgraded behind canonical aliases, and Netlify Forms plus a credential-free RDAP Function provide the backend behavior.

**Tech Stack:** React 18, TypeScript, React Router, Framer Motion, Tailwind CSS, Vite, Netlify Forms, Netlify Functions

---

### Task 1: Define platform contracts

**Files:**
- Create: `tests/service-platform.test.mjs`
- Modify: `src/data/services.ts`
- Create: `src/data/serviceFormFields.ts`

- [ ] Write failing contract tests for all required service fields, stable IDs,
  form types, project examples, and conditional field groups.
- [ ] Run `npm test` and confirm the new contracts fail against the old catalog.
- [ ] Replace the minimal service list with the complete typed catalog and field
  configuration.
- [ ] Run `npm test` and confirm catalog contracts pass.

### Task 2: Build service request pages

**Files:**
- Modify: `src/components/ui/ServiceCard.tsx`
- Create: `src/components/forms/ServiceRequestForm.tsx`
- Create: `src/pages/ServiceRequest.tsx`
- Modify: `src/pages/Services.tsx`
- Modify: `src/App.tsx`

- [ ] Add failing tests for `/request/:serviceId` and the three card actions.
- [ ] Run `npm test` and confirm route/action failures.
- [ ] Implement the request page, conditional form, validation, form-name
  selection, success state, and four-way CTA navigation.
- [ ] Run tests and `npm run lint`.

### Task 3: Upgrade the mockup builder

**Files:**
- Modify: `src/components/mockup/MockupBuilderForm.tsx`
- Create: `src/components/mockup/MockupLivePreview.tsx`
- Modify: `src/components/mockup/mockupOptions.ts`
- Modify: `src/pages/MockupBuilder.tsx`
- Modify: `src/App.tsx`

- [ ] Add failing tests for `/mockup-builder`, live preview regions, copy action,
  and submission.
- [ ] Implement a responsive live preview driven by the form state.
- [ ] Preserve `/mockup` as an alias and prefill service/inspiration query data.
- [ ] Run tests and type checks.

### Task 4: Add free domain lookup

**Files:**
- Create: `netlify/functions/rdap-domain.mjs`
- Modify: `src/components/ui/DomainHelpPanel.tsx`
- Modify: `src/pages/Domains.tsx`
- Modify: `src/App.tsx`

- [ ] Add failing tests for domain validation, TLD composition, RDAP endpoint
  usage, and fallback wording.
- [ ] Implement the timeout-protected RDAP Function and UI states.
- [ ] Preserve `/domains` as an alias for `/domain-help`.
- [ ] Run function unit tests, TypeScript, and the production build.

### Task 5: Add website audit requests

**Files:**
- Create: `src/components/forms/WebsiteAuditForm.tsx`
- Create: `src/pages/WebsiteAudit.tsx`
- Modify: `src/App.tsx`

- [ ] Add failing tests for the route, required fields, checklist labels, and
  `website-audit` submission.
- [ ] Implement URL validation, checklist reveal, first-error focus, and success
  state.
- [ ] Run tests and type checks.

### Task 6: Register forms and connect navigation

**Files:**
- Modify: `public/__forms.html`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/portfolio/IframeFallback.tsx`
- Modify: `src/components/portfolio/ProjectPreviewCard.tsx`
- Modify: `public/sitemap.xml`

- [ ] Add failing tests requiring all seven Netlify Forms and canonical routes.
- [ ] Add every submitted field to the static forms.
- [ ] Point mockup/domain links at canonical routes and add the audit link.
- [ ] Keep old aliases operational.
- [ ] Run tests and build.

### Task 7: Documentation and release verification

**Files:**
- Modify: `README.md`
- Modify: `docs/DEPLOY-NOTES.md`

- [ ] Document form handling, submissions, service additions, local testing,
  deployment, free limitations, and future paid upgrades.
- [ ] Run `npm ci`, `npm test`, `npm run lint`, `npm run build`,
  `npm audit --omit=dev`, and `git diff --check`.
- [ ] Browser-test all required routes at desktop and mobile sizes.
- [ ] Commit, push `main`, wait for the linked Netlify production deploy, verify
  all seven registered forms and the RDAP Function, then leave production open
  in Chrome.

