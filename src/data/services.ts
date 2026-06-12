import type { ServiceFormType } from "./serviceFormFields";

export type ServiceCategory =
  | "Build"
  | "Launch"
  | "Improve"
  | "Grow"
  | "Brand"
  | "Support";

export type ServiceComplexity = "Focused" | "Standard" | "Advanced";

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  formType: ServiceFormType;
  estimatedComplexity: ServiceComplexity;
  suggestedStartingPoint: string;
  exampleProjectUrl?: string;
  exampleProjectTitle?: string;
}

export const services: Service[] = [
  {
    id: "custom-website-creation",
    title: "Custom Website Creation",
    category: "Build",
    shortDescription: "A fully custom website designed around your business and goals.",
    fullDescription:
      "We plan, design, build, test, and launch a custom website that fits your brand instead of forcing your business into a generic template.",
    icon: "🍋",
    features: ["Custom visual direction", "Responsive page system", "Contact and conversion paths", "Launch support"],
    formType: "customWebsite",
    estimatedComplexity: "Advanced",
    suggestedStartingPoint: "Share your business, must-have pages, and two websites you like.",
    exampleProjectUrl: "https://pacificside-insurance.netlify.app/",
    exampleProjectTitle: "PacificSide Insurance",
  },
  {
    id: "business-landing-page",
    title: "Business Landing Page",
    category: "Build",
    shortDescription: "A focused single page built around one offer and one clear action.",
    fullDescription:
      "Launch a polished campaign or business page with a strong headline, proof, offer details, and a direct call to action.",
    icon: "🚀",
    features: ["Offer strategy", "Conversion-focused sections", "Lead capture", "Mobile-first build"],
    formType: "landingPage",
    estimatedComplexity: "Focused",
    suggestedStartingPoint: "Define the main offer, target audience, and action visitors should take.",
    exampleProjectUrl: "https://indulging-treats.netlify.app/",
    exampleProjectTitle: "Indulging Treats",
  },
  {
    id: "multi-page-website",
    title: "Full Multi-Page Website",
    category: "Build",
    shortDescription: "A complete website with room for services, story, proof, and growth.",
    fullDescription:
      "Build a structured website that gives each major part of your business the space it needs while keeping navigation simple.",
    icon: "📄",
    features: ["Page architecture", "Reusable sections", "Integrations", "SEO-ready structure"],
    formType: "multiPageWebsite",
    estimatedComplexity: "Advanced",
    suggestedStartingPoint: "List the pages you need and identify what content already exists.",
    exampleProjectUrl: "https://success-stories-program-tkdl.netlify.app/",
    exampleProjectTitle: "Success Stories Program TKDL",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Build",
    shortDescription: "Showcase creative work, projects, experience, and case studies.",
    fullDescription:
      "Present your best work with flexible galleries, project stories, credentials, and contact paths that feel personal and professional.",
    icon: "🎨",
    features: ["Project galleries", "Case-study layouts", "Bio and resume sections", "Social links"],
    formType: "portfolioWebsite",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Choose your strongest work samples and how you want them grouped.",
    exampleProjectUrl: "https://otmworkshops-portfolio.netlify.app/",
    exampleProjectTitle: "OTM Workshops Portfolio",
  },
  {
    id: "ecommerce-setup",
    title: "E-Commerce Setup",
    category: "Build",
    shortDescription: "A clear storefront plan for products, checkout, shipping, and inventory.",
    fullDescription:
      "We help organize products and customer flows, then connect an appropriate commerce platform and payment process.",
    icon: "🛒",
    features: ["Product structure", "Checkout planning", "Shipping configuration", "Inventory workflow"],
    formType: "ecommerce",
    estimatedComplexity: "Advanced",
    suggestedStartingPoint: "Estimate product count and identify your preferred payment or store platform.",
    exampleProjectUrl: "https://purelygemsllc.netlify.app/",
    exampleProjectTitle: "Purely Gems LLC",
  },
  {
    id: "booking-contact-forms",
    title: "Booking & Contact Forms",
    category: "Build",
    shortDescription: "Make it easy for customers to ask, book, register, or request help.",
    fullDescription:
      "We design accessible forms and booking paths with useful fields, clear confirmation states, notifications, and spam protection.",
    icon: "📅",
    features: ["Custom form fields", "Booking flow planning", "Email notifications", "Spam protection"],
    formType: "bookingForms",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "List the information you need from each customer and where notifications should go.",
    exampleProjectUrl: "https://mableshome.com/",
    exampleProjectTitle: "Mable's Home",
  },
  {
    id: "domain-search-setup",
    title: "Domain Search & Setup",
    category: "Launch",
    shortDescription: "Find, purchase, connect, and manage the right domain for your brand.",
    fullDescription:
      "We help customers research domain names, choose a registrar, connect DNS, enable HTTPS, and keep ownership clear.",
    icon: "🔍",
    features: ["Name research", "Public registration lookup", "DNS connection", "SSL guidance"],
    formType: "domainHelp",
    estimatedComplexity: "Focused",
    suggestedStartingPoint: "Bring two or three domain ideas and your preferred extension.",
  },
  {
    id: "domain-transfer-help",
    title: "Domain Transfer Help",
    category: "Launch",
    shortDescription: "Move or reconnect a domain carefully without claiming registrar status.",
    fullDescription:
      "We guide access, authorization, DNS, and verification steps when a domain needs to move between accounts, owners, or services.",
    icon: "🔁",
    features: ["Registrar review", "Transfer readiness", "DNS preservation", "Connection verification"],
    formType: "domainHelp",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Identify the current registrar, current host, and who controls the account.",
  },
  {
    id: "hosting-setup",
    title: "Hosting Setup",
    category: "Launch",
    shortDescription: "Configure reliable hosting, domains, HTTPS, and deployment settings.",
    fullDescription:
      "We prepare the hosting environment, connect the domain, confirm secure delivery, and document how the site is published.",
    icon: "☁️",
    features: ["Host selection", "Domain connection", "HTTPS verification", "Launch checklist"],
    formType: "websiteTransfer",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Share the current platform, domain access status, and expected traffic.",
    exampleProjectUrl: "https://safehavenforempowerment.org/",
    exampleProjectTitle: "Safe Haven for Empowerment",
  },
  {
    id: "netlify-deployment",
    title: "Netlify Deployment",
    category: "Launch",
    shortDescription: "Connect code, builds, forms, redirects, and production releases.",
    fullDescription:
      "We configure a modern Netlify deployment so updates are repeatable, forms are detected, and production has a clear release process.",
    icon: "⚡",
    features: ["Git connection", "Build configuration", "Forms and redirects", "Deploy verification"],
    formType: "websiteTransfer",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Share the repository, current host, and domain access status.",
    exampleProjectUrl: "https://erebustk.netlify.app/",
    exampleProjectTitle: "Erebus TK",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    category: "Improve",
    shortDescription: "Turn an outdated or confusing site into a fresh, focused experience.",
    fullDescription:
      "We audit what should stay, identify the largest experience problems, and rebuild the visual and content system around current goals.",
    icon: "✨",
    features: ["Current-site review", "Visual redesign", "Content migration plan", "Responsive rebuild"],
    formType: "websiteRedesign",
    estimatedComplexity: "Advanced",
    suggestedStartingPoint: "Share the current URL, the biggest problems, and examples of the new direction.",
    exampleProjectUrl: "https://loverebel.netlify.app/",
    exampleProjectTitle: "LoveRebel",
  },
  {
    id: "website-management",
    title: "Website Management",
    category: "Support",
    shortDescription: "Ongoing updates, reporting, fixes, and practical site support.",
    fullDescription:
      "Keep your website current with a clear list of recurring updates, response expectations, reporting needs, and ownership boundaries.",
    icon: "🧭",
    features: ["Content updates", "Technical support", "SEO maintenance", "Reporting options"],
    formType: "websiteManagement",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Estimate monthly changes and identify any urgent or recurring support needs.",
    exampleProjectUrl: "https://success-stories-program-tkdl.netlify.app/",
    exampleProjectTitle: "Success Stories Program TKDL",
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    category: "Support",
    shortDescription: "Focused fixes, content changes, dependency updates, and cleanup.",
    fullDescription:
      "Use a maintenance request for defined updates or recurring care when a full management plan is not needed.",
    icon: "🛠️",
    features: ["Content changes", "Bug fixes", "Dependency review", "Backup and release checks"],
    formType: "websiteManagement",
    estimatedComplexity: "Focused",
    suggestedStartingPoint: "List the specific updates, deadline, and current access status.",
    exampleProjectUrl: "https://colleges.claremont.edu/justice-education/",
    exampleProjectTitle: "Justice Education",
  },
  {
    id: "logo-branding",
    title: "Logo + Branding",
    category: "Brand",
    shortDescription: "Build a visual direction that makes the website feel coherent and recognizable.",
    fullDescription:
      "Define the logo direction, color system, typography, symbols, and tone that the website and social presence can share.",
    icon: "🏷️",
    features: ["Logo direction", "Color palette", "Typography", "Brand usage guidance"],
    formType: "branding",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Share the brand name, slogan, preferred colors, and three visual references.",
    exampleProjectUrl: "https://erebustk.netlify.app/",
    exampleProjectTitle: "Erebus TK",
  },
  {
    id: "seo-starter",
    title: "SEO Starter Setup",
    category: "Grow",
    shortDescription: "Strengthen metadata, structure, local targeting, and search basics.",
    fullDescription:
      "We organize titles, descriptions, page structure, sitemap signals, local relevance, and priority keywords without promising rankings.",
    icon: "📈",
    features: ["Metadata", "Search-friendly structure", "Local keyword plan", "Sitemap review"],
    formType: "seo",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Share the website, target city, business category, and priority searches.",
    exampleProjectUrl: "https://pacificside-insurance.netlify.app/",
    exampleProjectTitle: "PacificSide Insurance",
  },
  {
    id: "mobile-optimization",
    title: "Mobile Optimization",
    category: "Improve",
    shortDescription: "Fix layouts, navigation, forms, and calls to action on smaller screens.",
    fullDescription:
      "We review real mobile breakpoints, identify problem pages and controls, then improve readability, spacing, navigation, and conversion paths.",
    icon: "📱",
    features: ["Responsive layout fixes", "Touch-target review", "Mobile navigation", "Form usability"],
    formType: "mobileOptimization",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Share the URL, affected devices, and the pages that feel hardest to use.",
    exampleProjectUrl: "https://safehavenforempowerment.org/",
    exampleProjectTitle: "Safe Haven for Empowerment",
  },
  {
    id: "speed-optimization",
    title: "Speed Optimization",
    category: "Improve",
    shortDescription: "Reduce avoidable weight and improve the pages visitors wait on most.",
    fullDescription:
      "We inspect image use, loading behavior, assets, hosting, and page structure to prioritize practical speed improvements.",
    icon: "🏎️",
    features: ["Image review", "Asset cleanup", "Loading strategy", "Hosting recommendations"],
    formType: "speedOptimization",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Share the slowest pages, current host, and any known large images or scripts.",
    exampleProjectUrl: "https://indulging-treats.netlify.app/",
    exampleProjectTitle: "Indulging Treats",
  },
  {
    id: "ai-addons",
    title: "AI Content & Helpdesk Add-ons",
    category: "Grow",
    shortDescription: "Plan a focused assistant for FAQs, quotes, leads, or content support.",
    fullDescription:
      "We define a narrow AI workflow, its trusted knowledge, expected behavior, handoff rules, and future API requirements before implementation.",
    icon: "🤖",
    features: ["Use-case definition", "Knowledge-source plan", "Behavior guardrails", "Human handoff"],
    formType: "aiAddons",
    estimatedComplexity: "Advanced",
    suggestedStartingPoint: "Choose one assistant job and identify the information it is allowed to use.",
    exampleProjectUrl: "https://success-stories-program-tkdl.netlify.app/",
    exampleProjectTitle: "Success Stories Program TKDL",
  },
  {
    id: "social-media-landing-page",
    title: "Social Media Landing Page",
    category: "Grow",
    shortDescription: "A branded link hub or campaign page with stronger calls to action.",
    fullDescription:
      "Replace a generic link list with a fast branded page that connects social visitors to the right offers, channels, and contact paths.",
    icon: "🔗",
    features: ["Bio and positioning", "Priority links", "Social handles", "Campaign CTA"],
    formType: "socialLanding",
    estimatedComplexity: "Focused",
    suggestedStartingPoint: "Choose the platform, main conversion goal, and five highest-priority links.",
    exampleProjectUrl: "https://loverebel.netlify.app/",
    exampleProjectTitle: "LoveRebel",
  },
  {
    id: "secure-forms",
    title: "Secure Forms & Spam Protection",
    category: "Improve",
    shortDescription: "Create accessible forms with validation, notifications, and spam defenses.",
    fullDescription:
      "We design the field set, validation, confirmation flow, notification path, honeypot protection, and file-handling plan.",
    icon: "🛡️",
    features: ["Accessible fields", "Client validation", "Honeypot protection", "Notification planning"],
    formType: "secureForms",
    estimatedComplexity: "Standard",
    suggestedStartingPoint: "Define the form purpose, required fields, notification email, and whether files are needed.",
    exampleProjectUrl: "https://mableshome.com/",
    exampleProjectTitle: "Mable's Home",
  },
];

export const serviceCategories: ServiceCategory[] = [
  "Build",
  "Launch",
  "Improve",
  "Grow",
  "Brand",
  "Support",
];

export function getServiceById(serviceId: string | undefined): Service | undefined {
  return services.find((service) => service.id === serviceId);
}
