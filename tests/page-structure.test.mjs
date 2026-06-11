import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const primaryPages = [
  "src/pages/Work.tsx",
  "src/pages/Services.tsx",
  "src/pages/MockupBuilder.tsx",
  "src/pages/Domains.tsx",
  "src/pages/Pricing.tsx",
  "src/pages/Process.tsx",
  "src/pages/About.tsx",
  "src/pages/Contact.tsx",
];

test("every primary route declares one h1 through SectionHeading", () => {
  for (const path of primaryPages) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /headingLevel="h1"/, `${path} must declare its page title as an h1`);
  }
});

test("SectionHeading supports heading levels and stable ids", () => {
  const source = readFileSync("src/components/ui/SectionHeading.tsx", "utf8");
  assert.match(source, /headingLevel\?: "h1" \| "h2"/);
  assert.match(source, /id\?: string/);
  assert.match(source, /const Heading = headingLevel/);
  assert.match(source, /<Heading id=\{id\}/);
});

test("aria-labelledby sections provide matching heading ids", () => {
  const expectations = [
    ["src/pages/Domains.tsx", "domain-services"],
    ["src/pages/Domains.tsx", "domain-education"],
    ["src/pages/Pricing.tsx", "pricing-faq"],
    ["src/pages/About.tsx", "our-values"],
  ];

  for (const [path, id] of expectations) {
    const source = readFileSync(path, "utf8");
    assert.match(source, new RegExp(`id="${id}"`), `${path} must render heading id ${id}`);
  }
});

test("Netlify statically registers every JavaScript-submitted form", () => {
  const source = readFileSync("public/__forms.html", "utf8");
  const submitter = readFileSync("src/utils/netlifyForms.ts", "utf8");
  const forms = {
    "start-project": [
      "name",
      "email",
      "phone",
      "business",
      "projectType",
      "budget",
      "timeline",
      "contactMethod",
      "message",
      "bot-field",
    ],
    "mockup-builder": [
      "businessName",
      "businessType",
      "colors",
      "style",
      "pages",
      "features",
      "inspiration",
      "description",
      "budget",
      "timeline",
      "contactName",
      "email",
      "phone",
      "bot-field",
    ],
    "domain-help": ["name", "email", "domainNeed", "message", "bot-field"],
  };

  for (const [formName, fields] of Object.entries(forms)) {
    assert.match(source, new RegExp(`name="${formName}"`));
    assert.match(source, new RegExp(`name="form-name" value="${formName}"`));
    for (const field of fields) {
      assert.match(source, new RegExp(`name="${field}"`), `${formName} must register ${field}`);
    }
  }

  assert.match(submitter, /fetch\("\/__forms\.html"/);
});
