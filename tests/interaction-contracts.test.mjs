import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("the hero keeps the transparent logo and scroll control in the mobile-first flow", () => {
  const source = readFileSync("src/components/ui/Hero.tsx", "utf8");

  assert.match(source, /hero-mobile-art/);
  assert.match(source, /hero-desktop-art/);
  assert.match(source, /aria-label="Scroll down to featured work"/);
  assert.match(source, /lemonmade-logo-full\.png/);
});

test("site-wide motion includes scroll progress and honors reduced motion", () => {
  const layout = readFileSync("src/components/layout/Layout.tsx", "utf8");
  const progress = readFileSync("src/components/animations/ScrollProgress.tsx", "utf8");

  assert.match(layout, /<ScrollProgress \/>/);
  assert.match(progress, /useScroll/);
  assert.match(progress, /useReducedMotion/);
});

test("contact prefills react when only the query string changes", () => {
  const source = readFileSync("src/components/forms/ContactForm.tsx", "utf8");

  assert.match(source, /useEffect/);
  assert.match(source, /useRef/);
  assert.match(source, /params\.toString\(\)/);
  assert.match(source, /previousPrefill/);
  assert.match(source, /setForm/);
});

test("form submit controls prevent duplicate requests while sending", () => {
  const files = [
    "src/components/forms/ContactForm.tsx",
    "src/components/ui/DomainHelpPanel.tsx",
    "src/components/mockup/MockupSummaryCard.tsx",
  ];

  for (const path of files) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /disabled=/, `${path} must disable its submit action while sending`);
  }
});

test("invalid forms move keyboard focus to the first field that needs attention", () => {
  const files = [
    "src/components/forms/ContactForm.tsx",
    "src/components/ui/DomainHelpPanel.tsx",
    "src/components/mockup/MockupBuilderForm.tsx",
  ];

  for (const path of files) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /\.focus\(\)/, `${path} must focus its first invalid field`);
  }
});

test("deployment checks follow the current transparent assets and static form file", () => {
  const source = readFileSync("scripts/deploy-check.cmd", "utf8");

  assert.match(source, /lemonmade-logo-full\.png/);
  assert.match(source, /dist\\__forms\.html/);
  assert.doesNotMatch(source, /lemonmade-logo-md\.jpg/);
});

test("brand regeneration preserves the transparent PNG asset system", () => {
  const source = readFileSync("scripts/generate-brand-assets.ps1", "utf8");

  assert.match(source, /lemonmade-logo-cutout\.png/);
  assert.match(source, /lemonmade-logo-720\.png/);
  assert.match(source, /lemonmade-logo-mark\.png/);
  assert.match(source, /og-card\.png/);
  assert.doesNotMatch(source, /\.jpg/);
  assert.doesNotMatch(source, /Format Jpeg/);
});

test("public portfolio cards never link visitors to private admin dashboards", () => {
  const source = readFileSync("src/data/projects.ts", "utf8");

  assert.doesNotMatch(source, /app\.netlify\.com\/projects/);
});
