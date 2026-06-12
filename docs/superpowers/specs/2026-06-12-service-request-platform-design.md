# LemonMade Service Request Platform Design

## Objective

Turn the existing Services page into a free, production-ready request platform
where every service has a clear request, example, and mockup workflow. Preserve
Claude's portfolio preview work and the current LemonMade visual system.

## Architecture

### Service catalog

`src/data/services.ts` is the single source of truth. Every service has a stable
URL-safe `id`, category, summaries, feature list, form type, complexity,
starting point, and optional project example URL. Cards and request pages read
from this data instead of duplicating service content.

### Request workflow

`/request/:serviceId` resolves the service by ID. Unknown IDs render the existing
not-found experience. Valid services show the offer, features, next steps,
example link, and a reusable `ServiceRequestForm`.

The form has one shared contact section and a data-driven conditional section
selected by `formType`. Website redesigns submit as `redesign-request`, website
management and maintenance submit as `management-request`, and all other
services submit as `service-request`.

All submissions include:

- `form-name`
- `serviceId`
- `serviceTitle`
- `sourcePage`
- honeypot field

### Mockup builder

The existing builder remains available at `/mockup` and gains the canonical
`/mockup-builder` route. It keeps its summary/copy/submission workflow and adds a
live animated preview containing a hero, selected colors, page list, and feature
badges. A `service` query parameter can prefill the request context.

### Domain helper

The existing domain page remains available at `/domains` and gains the canonical
`/domain-help` route. The helper separates the domain label and TLD, validates
them, and calls `/.netlify/functions/rdap-domain`.

The Netlify Function uses the public `rdap.org` endpoint and no credentials.
Results are described as public registration data, never guaranteed
availability. Network errors and inconclusive responses show the required
manual-help fallback.

### Website audit

`/website-audit` provides a client-side checklist as soon as a valid URL is
entered and submits the request through the `website-audit` Netlify Form. It
does not claim to perform a remote technical scan.

### Netlify form detection

`public/__forms.html` statically declares:

- `start-project`
- `service-request`
- `mockup-builder`
- `domain-help`
- `website-audit`
- `redesign-request`
- `management-request`

The static declarations include every field that React may submit.

## Experience

- Services are grouped by category but remain one scannable responsive grid.
- Cards use lightweight tilt/lift motion and contain three explicit actions.
- Forms use accessible labels, inline validation, first-error focus, disabled
  sending controls, and success panels.
- Request pages provide four exits: request, mockup, work, and general contact.
- Existing scroll reveal, glow, shine, and reduced-motion behavior is reused.

## Error Handling

- Unknown services return the not-found page.
- Invalid forms focus the first invalid field.
- Failed submissions remain filled and show a retry message.
- RDAP 404 means no public registration record was found, not guaranteed
  availability.
- RDAP timeouts, blocked responses, and unknown statuses show manual-help copy.
- Clipboard failures leave the mockup content visible and usable.

## Verification

- Contract tests cover catalog fields, all required routes, form declarations,
  conditional form coverage, and RDAP function behavior.
- TypeScript and the Vite production build must pass.
- Browser QA covers desktop/mobile services, a dynamic request page, mockup live
  preview, domain lookup states, audit checklist, forms, console output, image
  loading, and route overflow.
- Netlify production must report the final commit as `ready`, expose the RDAP
  Function, and register all seven forms.

