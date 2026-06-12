export type ServiceFormType =
  | "customWebsite"
  | "landingPage"
  | "multiPageWebsite"
  | "portfolioWebsite"
  | "ecommerce"
  | "bookingForms"
  | "domainHelp"
  | "websiteTransfer"
  | "websiteRedesign"
  | "websiteManagement"
  | "branding"
  | "seo"
  | "mobileOptimization"
  | "speedOptimization"
  | "aiAddons"
  | "socialLanding"
  | "secureForms";

export type ServiceFieldKind = "text" | "url" | "email" | "textarea" | "select" | "checkboxes";

export interface ServiceFieldDefinition {
  name: string;
  label: string;
  kind: ServiceFieldKind;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

const yesNo = ["Yes", "No", "Not sure"];

export const serviceFormFields: Record<ServiceFormType, ServiceFieldDefinition[]> = {
  customWebsite: [
    { name: "businessType", label: "Business type", kind: "text", required: true },
    { name: "neededPages", label: "Needed pages", kind: "checkboxes", options: ["Home", "About", "Services", "Products", "Gallery", "Contact", "Blog", "Other"] },
    { name: "preferredStyle", label: "Preferred style", kind: "select", options: ["Clean", "Bold", "Luxury", "Friendly", "Corporate", "Editorial", "Not sure"] },
    { name: "inspirationWebsites", label: "Inspiration websites", kind: "textarea", placeholder: "Paste links or describe what you like." },
    { name: "featuresNeeded", label: "Features needed", kind: "checkboxes", options: ["Forms", "Booking", "Payments", "Gallery", "Blog", "Member area", "Other"] },
  ],
  landingPage: [
    { name: "mainOffer", label: "Main offer", kind: "text", required: true },
    { name: "mainCta", label: "Main CTA", kind: "text", required: true },
    { name: "targetAudience", label: "Target audience", kind: "textarea" },
    { name: "imagesAvailable", label: "Images available", kind: "select", options: yesNo },
    { name: "socialLinks", label: "Social links", kind: "textarea" },
  ],
  multiPageWebsite: [
    { name: "pageChecklist", label: "Page checklist", kind: "checkboxes", options: ["Home", "About", "Services", "Products", "Portfolio", "Blog", "Contact", "FAQ", "Other"] },
    { name: "contentStatus", label: "Content status", kind: "select", options: ["Ready", "Partly ready", "Needs writing", "Not sure"] },
    { name: "brandingStatus", label: "Branding status", kind: "select", options: ["Brand complete", "Logo only", "Needs refresh", "Starting fresh"] },
    { name: "neededIntegrations", label: "Needed integrations", kind: "checkboxes", options: ["Email", "Calendar", "Payments", "CRM", "Analytics", "Social feeds", "Other"] },
  ],
  portfolioWebsite: [
    { name: "portfolioType", label: "Type of portfolio", kind: "text", required: true },
    { name: "workCategories", label: "Work categories", kind: "textarea" },
    { name: "galleryNeeds", label: "Gallery needs", kind: "checkboxes", options: ["Images", "Video", "Audio", "Case studies", "Before and after", "Downloads"] },
    { name: "resumeBioNeeded", label: "Resume/bio needed", kind: "select", options: yesNo },
    { name: "socialLinks", label: "Social links", kind: "textarea" },
  ],
  ecommerce: [
    { name: "productCount", label: "Product count", kind: "select", options: ["1-10", "11-50", "51-200", "200+", "Not sure"], required: true },
    { name: "paymentProvider", label: "Payment provider", kind: "select", options: ["Stripe", "PayPal", "Square", "Shopify Payments", "Not chosen"] },
    { name: "shippingNeeds", label: "Shipping needs", kind: "checkboxes", options: ["Local pickup", "Flat rate", "Calculated shipping", "International", "Digital products", "Not sure"] },
    { name: "inventoryNeeds", label: "Inventory needs", kind: "select", options: ["Basic stock tracking", "Variants", "Multiple locations", "No inventory", "Not sure"] },
    { name: "platformPreference", label: "Platform preference", kind: "select", options: ["Shopify", "Stripe Checkout", "Square", "Custom", "Need a recommendation"] },
  ],
  bookingForms: [
    { name: "formFieldsNeeded", label: "Form fields needed", kind: "textarea", required: true },
    { name: "bookingType", label: "Booking type", kind: "select", options: ["Consultation", "Appointment", "Class", "Event", "Service request", "Other"] },
    { name: "notificationEmail", label: "Notification email", kind: "email" },
    { name: "spamProtectionNeeds", label: "Spam protection needs", kind: "select", options: ["Honeypot", "CAPTCHA", "Both", "Need a recommendation"] },
  ],
  domainHelp: [
    { name: "desiredDomain", label: "Desired domain", kind: "text", required: true },
    { name: "existingRegistrar", label: "Existing registrar", kind: "text" },
    { name: "domainTask", label: "Need new domain / transfer / connect / DNS fix", kind: "select", options: ["New domain", "Transfer", "Connect", "DNS fix", "Not sure"], required: true },
    { name: "currentHost", label: "Current host", kind: "text" },
  ],
  websiteTransfer: [
    { name: "currentPlatform", label: "Current platform", kind: "text", required: true },
    { name: "newPlatform", label: "New platform", kind: "text" },
    { name: "domainAccessStatus", label: "Domain access status", kind: "select", options: ["Full access", "Someone else has access", "No access", "Not sure"] },
    { name: "hostingAccessStatus", label: "Hosting access status", kind: "select", options: ["Full access", "Someone else has access", "No access", "Not sure"] },
    { name: "contentBackupStatus", label: "Content backup status", kind: "select", options: ["Complete backup", "Partial backup", "No backup", "Not sure"] },
  ],
  websiteRedesign: [
    { name: "currentWebsite", label: "Current website", kind: "url", required: true },
    { name: "currentProblems", label: "Problems with current site", kind: "textarea", required: true },
    { name: "inspirationSites", label: "Inspiration sites", kind: "textarea" },
    { name: "desiredNewStyle", label: "Desired new style", kind: "text" },
    { name: "keepExistingContent", label: "Keep existing content yes/no", kind: "select", options: yesNo },
  ],
  websiteManagement: [
    { name: "monthlyUpdates", label: "Monthly updates needed", kind: "textarea", required: true },
    { name: "emergencySupport", label: "Emergency support needed", kind: "select", options: yesNo },
    { name: "seoUpdates", label: "SEO updates", kind: "select", options: yesNo },
    { name: "contentUpdates", label: "Content updates", kind: "select", options: ["Weekly", "Monthly", "Occasional", "Not sure"] },
    { name: "analyticsReporting", label: "Analytics/reporting", kind: "select", options: ["Monthly report", "Quarterly report", "Dashboard access", "Not needed", "Not sure"] },
  ],
  branding: [
    { name: "brandName", label: "Brand name", kind: "text", required: true },
    { name: "slogan", label: "Slogan", kind: "text" },
    { name: "brandColors", label: "Colors", kind: "text" },
    { name: "symbols", label: "Symbols", kind: "text" },
    { name: "stylePreference", label: "Style preference", kind: "select", options: ["Modern", "Playful", "Luxury", "Minimal", "Bold", "Classic", "Not sure"] },
    { name: "brandExamples", label: "Examples", kind: "textarea" },
  ],
  seo: [
    { name: "websiteUrl", label: "Website URL", kind: "url", required: true },
    { name: "targetCity", label: "Target city", kind: "text" },
    { name: "targetKeywords", label: "Target keywords", kind: "textarea" },
    { name: "businessCategory", label: "Business category", kind: "text" },
    { name: "googleBusinessProfile", label: "Google Business Profile yes/no", kind: "select", options: yesNo },
  ],
  mobileOptimization: [
    { name: "websiteUrl", label: "Website URL", kind: "url", required: true },
    { name: "deviceIssues", label: "Device issues", kind: "textarea", required: true },
    { name: "problemPages", label: "Problem pages", kind: "textarea" },
    { name: "desiredFixes", label: "Desired fixes", kind: "textarea" },
  ],
  speedOptimization: [
    { name: "websiteUrl", label: "Website URL", kind: "url", required: true },
    { name: "slowPages", label: "Slow pages", kind: "textarea", required: true },
    { name: "imageHeavyPages", label: "Image-heavy pages", kind: "textarea" },
    { name: "currentHost", label: "Current host", kind: "text" },
    { name: "knownIssues", label: "Known issues", kind: "textarea" },
  ],
  aiAddons: [
    { name: "addonType", label: "Add-on type", kind: "select", options: ["Chatbot", "FAQ assistant", "Quote assistant", "Lead assistant", "Content assistant"], required: true },
    { name: "assistantType", label: "Chatbot / FAQ / quote assistant / lead assistant / content assistant", kind: "text" },
    { name: "knowledgeSource", label: "Knowledge source", kind: "textarea", required: true },
    { name: "desiredBehavior", label: "Desired behavior", kind: "textarea", required: true },
  ],
  socialLanding: [
    { name: "platform", label: "Platform", kind: "select", options: ["Instagram", "TikTok", "YouTube", "Facebook", "LinkedIn", "Multiple"], required: true },
    { name: "mainLinkGoal", label: "Main link goal", kind: "text", required: true },
    { name: "bioText", label: "Bio text", kind: "textarea" },
    { name: "socialHandles", label: "Social handles", kind: "textarea" },
    { name: "ctaLinks", label: "CTA links", kind: "textarea" },
  ],
  secureForms: [
    { name: "formPurpose", label: "Form purpose", kind: "text", required: true },
    { name: "fieldsNeeded", label: "Fields needed", kind: "textarea", required: true },
    { name: "notificationEmail", label: "Notification email", kind: "email" },
    { name: "spamProtection", label: "Spam protection", kind: "select", options: ["Honeypot", "CAPTCHA", "Both", "Need a recommendation"] },
    { name: "fileUploadNeeded", label: "File upload needed yes/no", kind: "select", options: yesNo },
  ],
};
