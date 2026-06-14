export type EstimatorServiceType =
  | "landing-page"
  | "small-business"
  | "premium-redesign";

export type DesignComplexity = "simple" | "standard" | "advanced";

export interface EstimateInput {
  serviceType: EstimatorServiceType;
  pages: number;
  designComplexity: DesignComplexity;
  features: string[];
  ecommerce: boolean;
  advancedAnimations: boolean;
  bookingPayment: boolean;
  domainHelp: boolean;
  rush: boolean;
  monthlyManagement: boolean;
}

export interface EstimateResult {
  low: number;
  high: number;
  estimatedRange: string;
  suggestedPackage: string;
  timeline: string;
  monthlyManagement: string | null;
  affectsFinalPrice: string[];
}

interface PackageDefinition {
  label: string;
  low: number;
  high: number;
  includedPages: number;
  timeline: string;
}

const packages: Record<EstimatorServiceType, PackageDefinition> = {
  "landing-page": {
    label: "Landing Page",
    low: 299,
    high: 599,
    includedPages: 1,
    timeline: "1–2 weeks",
  },
  "small-business": {
    label: "Small Business Website",
    low: 799,
    high: 1499,
    includedPages: 5,
    timeline: "2–4 weeks",
  },
  "premium-redesign": {
    label: "Premium/Redesign",
    low: 1499,
    high: 2999,
    includedPages: 7,
    timeline: "4–8 weeks",
  },
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatEstimateRange(low: number, high: number): string {
  return `${currency.format(low)}–${currency.format(high)}`;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const selectedPackage = packages[input.serviceType];
  let low = selectedPackage.low;
  let high = selectedPackage.high;
  const affectsFinalPrice = [
    "Final page count",
    "Design complexity",
    "Selected features",
    "Content readiness",
  ];

  const extraPages = Math.max(0, Math.round(input.pages) - selectedPackage.includedPages);
  low += extraPages * 100;
  high += extraPages * 250;

  const complexityMultiplier =
    input.designComplexity === "advanced"
      ? 1.35
      : input.designComplexity === "standard"
        ? 1.15
        : 1;
  low *= complexityMultiplier;
  high *= complexityMultiplier;

  if (input.ecommerce) {
    low += 400;
    high += 1200;
    affectsFinalPrice.push("E-commerce setup");
  }
  if (input.advancedAnimations) {
    low += 200;
    high += 600;
    affectsFinalPrice.push("Advanced animations");
  }
  if (input.bookingPayment) {
    low += 150;
    high += 500;
    affectsFinalPrice.push("Booking or payment setup");
  }
  if (input.domainHelp) {
    low += 75;
    high += 250;
    affectsFinalPrice.push("Domain or transfer help");
  }
  if (input.rush) {
    low *= 1.25;
    high *= 1.25;
    affectsFinalPrice.push("Rush timeline");
  }

  const roundedLow = Math.round(low);
  const roundedHigh = Math.round(high);

  return {
    low: roundedLow,
    high: roundedHigh,
    estimatedRange: formatEstimateRange(roundedLow, roundedHigh),
    suggestedPackage: selectedPackage.label,
    timeline: input.rush ? `Rush: ${selectedPackage.timeline}` : selectedPackage.timeline,
    monthlyManagement: input.monthlyManagement ? "From $99/mo" : null,
    affectsFinalPrice,
  };
}

export function packageForServiceId(
  serviceId: string | undefined
): EstimatorServiceType {
  if (
    serviceId === "business-landing-page" ||
    serviceId === "social-media-landing-page"
  ) {
    return "landing-page";
  }
  if (
    serviceId === "custom-website-creation" ||
    serviceId === "website-redesign" ||
    serviceId === "ecommerce-setup" ||
    serviceId === "ai-addons"
  ) {
    return "premium-redesign";
  }
  return "small-business";
}

interface MockupEstimateInput {
  pages: string[];
  features: string[];
  style: string;
  timeline: string;
}

export function estimateFromMockup(input: MockupEstimateInput): EstimateResult {
  const premiumStyle = ["Luxury", "Futuristic", "Real Estate", "Insurance"].includes(
    input.style
  );
  const premiumFeatures = input.features.some((feature) =>
    ["Store", "Client portal", "Chatbot"].includes(feature)
  );
  const serviceType: EstimatorServiceType =
    input.pages.length > 5 || premiumStyle || premiumFeatures
      ? "premium-redesign"
      : input.pages.length === 1
        ? "landing-page"
        : "small-business";

  return calculateEstimate({
    serviceType,
    pages: Math.max(1, input.pages.length),
    designComplexity: premiumStyle ? "advanced" : "standard",
    features: input.features,
    ecommerce: input.features.some((feature) =>
      ["Store", "Payments", "E-commerce"].includes(feature)
    ),
    advancedAnimations: input.features.includes("Advanced animations"),
    bookingPayment: input.features.some((feature) =>
      ["Booking", "Payments"].includes(feature)
    ),
    domainHelp: input.features.includes("Domain help"),
    rush: input.timeline === "ASAP",
    monthlyManagement: input.features.includes("Website management"),
  });
}
