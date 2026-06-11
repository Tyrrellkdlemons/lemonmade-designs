# LemonMade Service Integrations

## Working now

- GitHub-connected Netlify production deploys.
- Three Netlify Forms: `start-project`, `mockup-builder`, and `domain-help`.
- Contact and service links prefill the correct project request.
- Mockup summaries are generated in the browser and can be submitted.
- Portfolio filters, device previews, live-site links, and embed fallbacks.
- Responsive navigation, motion, custom pointer, scroll progress, and reduced-motion support.

No API keys are required for those features.

## Dashboard steps

### Form notifications

Netlify stores submissions already. To receive email alerts, open:

`Project configuration > Notifications > Form submission notifications`

Choose the destination email and select all three forms. This is intentionally a
dashboard choice because the recipient is private business information.

### Web analytics

Netlify Web Analytics can be enabled under `Logs & Metrics > Analytics`. Confirm
the current Netlify plan and pricing before enabling it.

## Optional upgrades

All secrets belong in Netlify environment variables and server-side Functions.
Never expose them in Vite variables or browser code.

| Upgrade | Service and setup | Suggested variables |
|---|---|---|
| Live domain availability | Name.com API account and credentials; proxy `POST /core/v1/domains:search` through a Netlify Function | `NAMECOM_USERNAME`, `NAMECOM_API_TOKEN` |
| Automatic inquiry replies | Verify the sending domain in Resend and create a restricted sending key | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` |
| Deposits or package checkout | Create Stripe products/prices, Checkout Sessions, and a verified webhook for fulfillment | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |
| Appointment booking | A Cal.com event link works for a basic embed; custom booking requires an API v2 key | `CAL_EVENT_URL` or `CAL_API_KEY` |
| AI project helper | OpenAI Responses API behind a Netlify Function, with usage limits and a defined prompt scope | `OPENAI_API_KEY` |
| Client uploads | Add a deliberate storage and privacy policy before enabling uploads; Netlify Forms uploads or Netlify Blobs are viable options | Depends on chosen storage |

## Implementation order

1. Configure Netlify form notifications.
2. Add Cal.com using a public event URL if booking is wanted.
3. Add Resend for automatic confirmations.
4. Add Stripe only after package prices, refund terms, and fulfillment rules are final.
5. Add Name.com or OpenAI only when their exact user flows and usage limits are approved.

## Operational checks

- Keep production secrets scoped to Netlify and marked as secrets.
- Verify Stripe and other webhooks before acting on any event.
- Rate-limit public API-backed Functions.
- Review form and upload usage against the active Netlify plan.
- Update `docs/DEPLOY-NOTES.md` for every production release.

## Official references

- [Netlify Forms setup](https://docs.netlify.com/manage/forms/setup/)
- [Netlify form notifications](https://docs.netlify.com/manage/forms/notifications/)
- [Netlify Web Analytics](https://docs.netlify.com/manage/monitoring/web-analytics/overview/)
- [Netlify secret environment variables](https://docs.netlify.com/build/environment-variables/secrets-controller/)
- [Name.com domain search API](https://docs.name.com/api/v1/reference/domains/search)
- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)
- [Resend API keys](https://resend.com/docs/create-an-api-key)
- [Stripe Checkout](https://docs.stripe.com/checkout/quickstart)
- [Stripe webhooks](https://docs.stripe.com/webhooks/quickstart)
- [Cal.com booking embed](https://cal.com/docs/platform/atoms/booker-embed)
- [OpenAI API quickstart](https://developers.openai.com/api/docs/quickstart)
- [OpenAI Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)
