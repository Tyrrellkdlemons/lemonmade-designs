import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(path, "utf8");

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
  ]) {
    assert.match(source, new RegExp(`\\b${field}\\b`), `missing service field ${field}`);
  }
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

test("service cards and dynamic request route expose all three actions", () => {
  const app = read("src/App.tsx");
  const card = read("src/components/ui/ServiceCard.tsx");

  assert.match(app, /path="\/request\/:serviceId"/);
  assert.match(card, /Request This Service/);
  assert.match(card, /See Example/);
  assert.match(card, /Build Quick Mockup/);
  assert.match(card, /\/request\/\$\{service\.id\}/);
  assert.match(card, /\/mockup-builder\?service=/);
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

test("canonical mockup builder includes a live preview and retains old alias", () => {
  const app = read("src/App.tsx");
  assert.ok(existsSync("src/components/mockup/MockupLivePreview.tsx"));
  const preview = read("src/components/mockup/MockupLivePreview.tsx");
  const form =
    read("src/components/mockup/MockupBuilderForm.tsx") +
    read("src/components/mockup/MockupSummaryCard.tsx");

  assert.match(app, /path="\/mockup-builder"/);
  assert.match(app, /path="\/mockup"/);
  assert.match(preview, /Hero preview/);
  assert.match(preview, /Page list preview/);
  assert.match(preview, /Feature badges/);
  assert.match(form, /Copy My Mockup Request/);
  assert.match(form, /Submit Mockup Request/);
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

test("website audit route renders the requested checklist and form", () => {
  const app = read("src/App.tsx");
  assert.ok(existsSync("src/components/forms/WebsiteAuditForm.tsx"));
  assert.ok(existsSync("src/pages/WebsiteAudit.tsx"));
  const form = read("src/components/forms/WebsiteAuditForm.tsx");

  assert.match(app, /path="\/website-audit"/);
  assert.match(form, /website-audit/);
  for (const item of [
    "Mobile layout",
    "Speed",
    "SEO basics",
    "Domain\\/SSL",
    "Contact forms",
    "Brand clarity",
    "CTA clarity",
  ]) {
    assert.match(form, new RegExp(item));
  }
});

test("portfolio iframe fallback preserves project context and actions", () => {
  const fallback = read("src/components/portfolio/IframeFallback.tsx");

  assert.match(fallback, /project\.title/);
  assert.match(fallback, /project\.category/);
  assert.match(fallback, /Open Live Site/);
  assert.match(fallback, /Request Similar Site/);
});

test("Netlify statically registers all seven production forms", () => {
  const forms = read("public/__forms.html");

  for (const name of [
    "start-project",
    "service-request",
    "mockup-builder",
    "domain-help",
    "website-audit",
    "redesign-request",
    "management-request",
  ]) {
    assert.match(forms, new RegExp(`name="${name}"`), `missing form ${name}`);
  }

  assert.equal((forms.match(/data-netlify="true"/g) || []).length, 7);
  assert.equal((forms.match(/netlify-honeypot="bot-field"/g) || []).length, 7);
});

test("README documents the free service platform operations", () => {
  const readme = read("README.md");

  for (const heading of [
    "How service forms work",
    "View submissions in Netlify",
    "Add a new service",
    "Free limitations",
    "Future paid upgrades",
  ]) {
    assert.match(readme, new RegExp(heading));
  }
});
