import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calculateEstimate,
  estimateFromMockup,
  formatEstimateRange,
  packageForServiceId,
} from "../src/data/estimatorLogic.ts";

const baseInput = {
  serviceType: "landing-page",
  pages: 1,
  designComplexity: "simple",
  features: [],
  ecommerce: false,
  advancedAnimations: false,
  bookingPayment: false,
  domainHelp: false,
  rush: false,
  monthlyManagement: false,
};

test("estimator returns the three required package base ranges", () => {
  assert.deepEqual(calculateEstimate(baseInput), {
    low: 299,
    high: 599,
    estimatedRange: "$299–$599",
    suggestedPackage: "Landing Page",
    timeline: "1–2 weeks",
    monthlyManagement: null,
    affectsFinalPrice: ["Final page count", "Design complexity", "Selected features", "Content readiness"],
  });

  assert.equal(
    calculateEstimate({ ...baseInput, serviceType: "small-business", pages: 5 }).estimatedRange,
    "$799–$1,499"
  );
  assert.equal(
    calculateEstimate({ ...baseInput, serviceType: "premium-redesign", pages: 7 }).estimatedRange,
    "$1,499–$2,999"
  );
});

test("estimator applies required add-ons, pages, complexity, rush, and management", () => {
  const base = calculateEstimate(baseInput);
  const expanded = calculateEstimate({
    ...baseInput,
    pages: 4,
    designComplexity: "advanced",
    features: ["Gallery", "Newsletter"],
    ecommerce: true,
    advancedAnimations: true,
    bookingPayment: true,
    domainHelp: true,
    rush: true,
    monthlyManagement: true,
  });

  assert.ok(expanded.low > base.low);
  assert.ok(expanded.high > base.high);
  assert.equal(expanded.monthlyManagement, "From $99/mo");
  assert.match(expanded.timeline, /Rush/);
  assert.ok(expanded.affectsFinalPrice.includes("E-commerce setup"));
  assert.ok(expanded.affectsFinalPrice.includes("Advanced animations"));
  assert.ok(expanded.affectsFinalPrice.includes("Booking or payment setup"));
  assert.ok(expanded.affectsFinalPrice.includes("Domain or transfer help"));
  assert.equal(expanded.estimatedRange, formatEstimateRange(expanded.low, expanded.high));
});

test("service ids map to the expected estimator package", () => {
  assert.equal(packageForServiceId("business-landing-page"), "landing-page");
  assert.equal(packageForServiceId("website-redesign"), "premium-redesign");
  assert.equal(packageForServiceId("custom-website-creation"), "premium-redesign");
  assert.equal(packageForServiceId("seo-starter"), "small-business");
});

test("mockup requests reuse the estimator without duplicating pricing logic", () => {
  const result = estimateFromMockup({
    pages: ["Home", "About", "Services", "Contact", "FAQ", "Portfolio"],
    features: ["Store", "Booking", "Advanced animations", "Domain help"],
    style: "Luxury",
    timeline: "ASAP",
  });

  assert.equal(result.suggestedPackage, "Premium/Redesign");
  assert.ok(result.low >= 1499);
  assert.match(result.timeline, /Rush/);
});
