export interface PricingTier {
  name: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Fresh Start",
    tagline: "For simple landing pages",
    features: [
      "1-page website",
      "Mobile optimization",
      "Contact form",
      "Basic SEO",
      "Netlify deployment",
    ],
  },
  {
    name: "Business Made",
    tagline: "For full businesses",
    features: [
      "5-page website",
      "Custom design",
      "Portfolio / services setup",
      "Domain connection help",
      "SEO starter",
      "Launch support",
    ],
    highlighted: true,
  },
  {
    name: "LemonPro",
    tagline: "For larger brands",
    features: [
      "Multi-page website",
      "Advanced animations",
      "Booking / payment integrations",
      "Ongoing management option",
      "Redesign / transfer support",
      "Priority launch help",
    ],
  },
  {
    name: "Custom Build",
    tagline: "For special projects",
    features: [
      "Web apps",
      "Dashboards",
      "AI features",
      "Advanced forms",
      "Client portals",
      "Unique systems",
    ],
  },
];
