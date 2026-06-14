import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(path, "utf8");
const formMarkup = (forms, name) => {
  const match = forms.match(new RegExp(`<form name="${name}"[\\s\\S]*?<\\/form>`));
  assert.ok(match, `missing form markup for ${name}`);
  return match[0];
};

test("service catalog exposes stable request-platform metadata", () => {
  const source = read("src/data/services.ts");
  const ids = [...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);

  assert.ok(ids.length >= 20, "catalog must include every current service");
  assert.equal(new Set(ids).size, ids.length, "service ids must be unique");
  for (const field of [
    "id",
    "title",
    "category",
    "shortDescription",
    "fullDescription",
    "icon",
    "features",
    "formType",
    "estimatedComplexity",
    "suggestedStartingPoint",
    "startingPrice",
    "priceRange",
    "timelineEstimate",
  ]) {
    assert.match(source, new RegExp(`\\b${field}\\b`), `missing service field ${field}`);
  }
  assert.equal((source.match(/\bstartingPrice:\s*"/g) || []).length, ids.length);
  assert.equal((source.match(/\bpriceRange:\s*"/g) || []).length, ids.length);
  assert.equal((source.match(/\btimelineEstimate:\s*"/g) || []).length, ids.length);
  assert.match(source, /exampleProjectUrl/);
  assert.match(source, /getServiceById/);
});

test("conditional service form definitions cover every requested workflow", () => {
  assert.ok(existsSync("src/data/serviceFormFields.ts"));
  const source = read("src/data/serviceFormFields.ts");

  for (const formType of [
    "customWebsite",
    "landingPage",
    "multiPageWebsite",
    "portfolioWebsite",
    "ecommerce",
    "bookingForms",
    "domainHelp",
    "websiteTransfer",
    "websiteRedesign",
    "websiteManagement",
    "branding",
    "seo",
    "mobileOptimization",
    "speedOptimization",
    "aiAddons",
    "socialLanding",
    "secureForms",
  ]) {
    assert.match(source, new RegExp(`\\b${formType}\\b`), `missing ${formType} fields`);
  }

  for (const label of [
    "Business type",
    "Main offer",
    "Page checklist",
    "Type of portfolio",
    "Product count",
    "Booking type",
    "Desired domain",
    "Current platform",
    "Problems with current site",
    "Monthly updates needed",
    "Brand name",
    "Target city",
    "Device issues",
    "Slow pages",
    "Add-on type",
    "Main link goal",
    "Form purpose",
  ]) {
    assert.match(source, new RegExp(label));
  }
});

test("service cards and dynamic request route expose all four actions", () => {
  const app = read("src/App.tsx");
  const card = read("src/components/ui/ServiceCard.tsx");
  const page = read("src/pages/ServiceRequest.tsx");

  assert.match(app, /path="\/request\/:serviceId"/);
  assert.match(card, /Request This Service/);
  assert.match(card, /See Example/);
  assert.match(card, /Build Quick Mockup/);
  assert.match(card, /Get Estimate/);
  assert.match(card, /\/request\/\$\{service\.id\}/);
  assert.match(card, /\/mockup-builder\?service=/);
  assert.match(card, /\/estimate\?service=/);
  assert.match(card, /service\.startingPrice/);
  assert.match(card, /service\.timelineEstimate/);
  assert.match(page, /service\.priceRange/);
  assert.match(page, /service\.timelineEstimate/);
  assert.match(page, /Get Estimate/);
});

test("service request form includes shared, hidden, conditional, and success behavior", () => {
  assert.ok(existsSync("src/components/forms/ServiceRequestForm.tsx"));
  assert.ok(existsSync("src/pages/ServiceRequest.tsx"));
  const form = read("src/components/forms/ServiceRequestForm.tsx");
  const page = read("src/pages/ServiceRequest.tsx");

  for (const field of [
    "serviceId",
    "serviceTitle",
    "sourcePage",
    "name",
    "email",
    "phone",
    "businessName",
    "currentWebsiteUrl",
    "budget",
    "timeline",
    "message",
    "preferredContactMethod",
    "estimatedRange",
    "bot-field",
  ]) {
    assert.match(form, new RegExp(field));
  }
  assert.match(form, /redesign-request/);
  assert.match(form, /management-request/);
  assert.match(form, /service-request/);
  assert.match(form, /Request received/);
  assert.ok(
    form.indexOf("for (const field of fields)") < form.indexOf('if (!value("name"))'),
    "validation order must follow the rendered service fields before contact fields"
  );
  assert.match(page, /getServiceById/);
  assert.match(page, /Build Mockup/);
  assert.match(page, /View Work/);
  assert.match(page, /Contact LemonMade/);
});

test("quote estimator route uses shared logic and submits the complete form contract", () => {
  const app = read("src/App.tsx");
  const pagePath = "src/pages/Estimate.tsx";

  assert.ok(existsSync(pagePath));
  const page = read(pagePath);

  assert.match(app, /path="\/estimate"/);
  assert.match(page, /useSearchParams/);
  assert.match(page, /calculateEstimate/);
  assert.match(page, /packageForServiceId/);
  assert.match(page, /project-estimate/);
  assert.match(
    page,
    /This is a starter estimate, not a final invoice\. LemonMade Designs confirms pricing after reviewing your project\./
  );

  for (const action of [
    "Copy Estimate",
    "Submit Estimate Request",
    "Build Mockup",
    "Contact LemonMade",
  ]) {
    assert.match(page, new RegExp(action));
  }

  for (const field of [
    "serviceType",
    "pages",
    "designComplexity",
    "features",
    "timelineUrgency",
    "ecommerce",
    "advancedAnimations",
    "bookingPayment",
    "domainHelp",
    "redesign",
    "monthlyManagement",
    "name",
    "email",
    "phone",
    "businessName",
    "message",
    "estimatedRange",
    "suggestedPackage",
  ]) {
    assert.match(page, new RegExp(field), `missing estimate field ${field}`);
  }
});

test("canonical mockup builder includes expanded options, estimate, draft controls, and old alias", async () => {
  const app = read("src/App.tsx");
  assert.ok(existsSync("src/components/mockup/MockupLivePreview.tsx"));
  const preview = read("src/components/mockup/MockupLivePreview.tsx");
  const form =
    read("src/components/mockup/MockupBuilderForm.tsx") +
    read("src/components/mockup/MockupSummaryCard.tsx");
  const page = read("src/pages/MockupBuilder.tsx");
  const options = await import("../src/components/mockup/mockupOptions.ts");

  assert.match(app, /path="\/mockup-builder"/);
  assert.match(app, /path="\/mockup"/);
  assert.match(preview, /Hero preview/);
  assert.match(preview, /Page list preview/);
  assert.match(preview, /Feature badges/);
  assert.match(form, /Copy My Mockup Request/);
  assert.match(form, /Submit Mockup Request/);
  assert.match(form, /Save Draft Locally/);
  assert.match(form, /Reset/);
  assert.match(form, /estimateFromMockup/);
  assert.match(form, /Suggested package/);
  assert.match(form, /Estimated range/);
  assert.doesNotMatch(page, /free, no commitment/i);

  assert.equal(options.styles.length, 12);
  assert.equal(options.pageOptions.length, 12);
  assert.ok(options.featureOptions.length >= 14);
  for (const option of ["Real Estate", "Insurance", "Education"]) {
    assert.ok(options.styles.includes(option));
  }
  for (const option of ["Portfolio", "FAQ"]) {
    assert.ok(options.pageOptions.includes(option));
  }
  for (const option of [
    "Store",
    "Gallery",
    "Testimonials",
    "Blog",
    "Chatbot",
    "Newsletter",
    "File upload",
    "Client portal",
  ]) {
    assert.ok(options.featureOptions.includes(option));
  }
});

test("domain helper uses a credential-free RDAP Netlify Function and fallback", async () => {
  const app = read("src/App.tsx");
  const panel = read("src/components/ui/DomainHelpPanel.tsx");
  const functionPath = "netlify/functions/rdap-domain.mjs";

  assert.match(app, /path="\/domain-help"/);
  assert.match(app, /path="\/domains"/);
  assert.match(panel, /Check public registration data/);
  assert.match(panel, /\.netlify\/functions\/rdap-domain/);
  assert.match(
    panel,
    /We can help check, purchase, connect, or transfer this domain manually\./
  );
  assert.ok(existsSync(functionPath));

  const mod = await import(`../${functionPath}`);
  assert.equal(mod.normalizeDomain(" Example.COM "), "example.com");
  assert.equal(mod.normalizeDomain("bad domain"), null);
  assert.equal(mod.normalizeDomain("-bad.com"), null);
});

test("website review route renders quote-based copy, expanded inputs, and ten review areas", () => {
  const app = read("src/App.tsx");
  assert.ok(existsSync("src/components/forms/WebsiteAuditForm.tsx"));
  assert.ok(existsSync("src/pages/WebsiteAudit.tsx"));
  const form = read("src/components/forms/WebsiteAuditForm.tsx");
  const page = read("src/pages/WebsiteAudit.tsx");

  assert.match(app, /path="\/website-audit"/);
  assert.match(form, /website-audit/);
  assert.match(form, /businessType/);
  assert.match(form, /areaConcerns/);
  assert.match(form, /Request My Review/);
  assert.match(page, /Starter Website Review/);
  assert.match(page, /Get a quote for fixes/);
  assert.doesNotMatch(page, /Free website audit/i);
  assert.doesNotMatch(form, /free request/i);
  for (const item of [
    "Mobile",
    "Speed",
    "SEO",
    "SSL\\/domain",
    "Contact forms",
    "Brand clarity",
    "CTA clarity",
    "Accessibility",
    "Content structure",
    "Trust signals",
  ]) {
    assert.match(form, new RegExp(item));
  }
});

test("lead workflow route maps every customer stage to a working destination", () => {
  const app = read("src/App.tsx");
  const footer = read("src/components/layout/Footer.tsx");
  const sitemap = read("public/sitemap.xml");
  const pagePath = "src/pages/LeadWorkflow.tsx";

  assert.ok(existsSync(pagePath));
  const page = read(pagePath);

  assert.match(app, /path="\/lead-workflow"/);
  assert.match(footer, /\/lead-workflow/);
  assert.match(sitemap, /\/lead-workflow/);
  assert.match(sitemap, /\/estimate/);
  for (const stage of [
    "Services",
    "Request",
    "Mockup",
    "Estimate",
    "Submit",
    "Follow-up",
  ]) {
    assert.match(page, new RegExp(stage));
  }
  for (const route of [
    "/services",
    "/request/custom-website-creation",
    "/mockup-builder",
    "/estimate",
    "/contact",
  ]) {
    assert.match(page, new RegExp(route.replaceAll("/", "\\/")));
  }
});

test("portfolio iframe fallback preserves project context and actions", () => {
  const fallback = read("src/components/portfolio/IframeFallback.tsx");

  assert.match(fallback, /project\.title/);
  assert.match(fallback, /project\.category/);
  assert.match(fallback, /Open Live Site/);
  assert.match(fallback, /Request Similar Site/);
});

test("Netlify statically registers all eight production forms and every new payload field", () => {
  const forms = read("public/__forms.html");

  for (const name of [
    "start-project",
    "service-request",
    "mockup-builder",
    "domain-help",
    "website-audit",
    "redesign-request",
    "management-request",
    "project-estimate",
  ]) {
    assert.match(forms, new RegExp(`name="${name}"`), `missing form ${name}`);
  }

  assert.equal((forms.match(/data-netlify="true"/g) || []).length, 8);
  assert.equal((forms.match(/netlify-honeypot="bot-field"/g) || []).length, 8);

  for (const name of ["service-request", "redesign-request", "management-request"]) {
    assert.match(formMarkup(forms, name), /name="estimatedRange"/);
  }
  for (const field of ["estimatedRange", "suggestedPackage"]) {
    assert.match(formMarkup(forms, "mockup-builder"), new RegExp(`name="${field}"`));
  }
  for (const field of ["businessType", "areaConcerns"]) {
    assert.match(formMarkup(forms, "website-audit"), new RegExp(`name="${field}"`));
  }
  for (const field of [
    "sourceServiceId",
    "serviceType",
    "pages",
    "designComplexity",
    "features",
    "timelineUrgency",
    "ecommerce",
    "advancedAnimations",
    "bookingPayment",
    "domainHelp",
    "redesign",
    "monthlyManagement",
    "estimatedRange",
    "suggestedPackage",
    "estimatedTimeline",
    "name",
    "email",
    "phone",
    "businessName",
    "message",
    "bot-field",
  ]) {
    assert.match(
      formMarkup(forms, "project-estimate"),
      new RegExp(`name="${field}"`),
      `missing project-estimate field ${field}`
    );
  }
});

test("README and integration docs cover eight-form operations and safe changes", () => {
  const readme = read("README.md");
  const integrations = read("docs/INTEGRATIONS.md");

  for (const text of [
    "How service forms work",
    "View submissions in Netlify",
    "Add a new service",
    "Eight Netlify Forms",
    "Enable form notifications",
    "Add form fields safely",
    "project-estimate",
    "Future paid upgrades",
  ]) {
    assert.match(`${readme}\n${integrations}`, new RegExp(text));
  }
  assert.match(`${readme}\n${integrations}`, /n8n/i);
});

test("customer-facing lead copy avoids free-service positioning", () => {
  const source = [
    "src/pages/Home.tsx",
    "src/pages/Services.tsx",
    "src/pages/MockupBuilder.tsx",
    "src/pages/WebsiteAudit.tsx",
    "src/components/forms/WebsiteAuditForm.tsx",
    "src/components/layout/Footer.tsx",
  ].map(read).join("\n");

  assert.doesNotMatch(source, /Free mockups|Free Netlify Forms|Free Website Audit|free, no commitment/i);
});
