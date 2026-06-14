# LemonMade Estimator and Workflow Completion Design

## Objective

Complete the quote-based customer journey without replacing the existing service,
mockup, domain, audit, portfolio, or Netlify form systems.

## Baseline

The tracked repository at `f2df874` is healthy and builds successfully. The
reported source truncation was not present in this working tree. A stale
`.git/index.lock` was removed after confirming no Git process was active. The
untracked `CODEX_HANDOFF.md` and `CODEX_PROMPT.md` files remain untouched.

## Architecture

- Keep `src/data/services.ts` as the source of truth for service content and add
  visible price/timeline metadata to every service.
- Add a pure `src/data/estimatorLogic.ts` module. UI components consume its
  deterministic result rather than duplicating price calculations.
- Add `/estimate` as a client-side calculator and Netlify form.
- Reuse the estimator in the mockup summary for a suggested package and range.
- Add `/lead-workflow` as a linked overview of the customer journey.
- Keep submissions in Netlify Forms. No database, paid API, or automation
  service is required.

## Estimator Formula

The calculator starts with one package:

- Landing Page: `$299` low, `$599` high, one included page.
- Small Business Website: `$799` low, `$1,499` high, five included pages.
- Premium/Redesign: `$1,499` low, `$2,999` high, seven included pages.

Adjustments:

- Extra pages: `$100-$250` each above the package allowance.
- Standard design complexity: multiply by `1.15`.
- Advanced design complexity: multiply by `1.35`.
- E-commerce: add `$400-$1,200`.
- Advanced animations: add `$200-$600`.
- Booking/payment: add `$150-$500`.
- Domain/transfer: add `$75-$250`.
- Rush timeline: multiply the project range by `1.25`.
- Monthly management is shown separately as `from $99/mo`.

The result includes a low/high range, suggested package, timeline, recurring
management note, and a list of factors affecting final pricing. Values round to
whole dollars.

## User Experience

### Services and Requests

Service cards show starting price and timeline, then offer Request, Example,
Mockup, and Estimate actions. Request pages show price range and timeline near
the title and submit the visible range in `estimatedRange`.

### Estimate

`/estimate?service=:id` prefills an appropriate package from the selected
service. The form updates its estimate immediately and provides Copy Estimate,
Submit Estimate Request, Build Mockup, and Contact LemonMade actions. Successful
submission uses the required follow-up message.

### Mockup

The builder expands its style, page, and feature options. Save Draft Locally and
Reset are explicit actions. The existing summary adds the estimator package and
range while preserving copy and submit behavior.

### Starter Website Review

The page removes "Free" positioning, adds business type and per-area concerns,
and displays ten transparent review categories. It remains a client-side
preparation checklist and never claims to run an automated scan.

### Lead Workflow

The workflow page links Services -> Request -> Mockup -> Estimate -> Submit ->
Follow-up. Every actionable stage points to a working route.

## Forms

Netlify statically registers eight forms:

`start-project`, `service-request`, `mockup-builder`, `domain-help`,
`website-audit`, `redesign-request`, `management-request`, and
`project-estimate`.

Blueprints include every field submitted by their React forms. Service forms
include `estimatedRange`; website review includes the expanded concern fields;
the estimate form includes the calculated range and suggested package.

## n8n Decision

n8n is not part of this release. The current workflow is a direct browser-to-
Netlify submission with no cross-system orchestration, scheduled work, durable
retry queue, or CRM sync. Adding n8n now would create an unnecessary service,
credential surface, and operational dependency.

n8n becomes useful later if LemonMade chooses a specific CRM, email platform,
task board, or SMS provider and needs branching, retries, deduplication, and
multi-step follow-up across those systems.

## Verification

- Pure estimator tests cover package bases, add-ons, page/complexity changes,
  rush multiplication, and management output.
- Structural tests cover routes, service metadata, options, copy, form fields,
  and form registration.
- Full TypeScript build and test suite must pass.
- Browser QA covers desktop, tablet, and mobile widths; no overflow, console
  errors, dead actions, or missing routes.
- Production verification covers the GitHub commit, Netlify deploy, eight
  registered forms, live estimator route, and RDAP function.

