export const businessTypes = [
  "Local business", "Restaurant / Food", "E-commerce / Shop", "Nonprofit",
  "Portfolio / Creative", "Professional services", "Insurance / Finance",
  "Education / Program", "Other",
];

export const styles = [
  "Clean", "Luxury", "Bold", "Fun", "Corporate", "Futuristic",
  "Nonprofit", "Food/Dessert", "Portfolio", "Real Estate", "Insurance",
  "Education",
];

export const pageOptions = [
  "Home", "About", "Services", "Shop", "Booking",
  "Contact", "Gallery", "Blog", "Donations", "Events", "Portfolio", "FAQ",
];

export const featureOptions = [
  "Contact form", "Booking", "Payments", "Domain help", "Logo help",
  "SEO", "Website transfer", "Social media links", "Admin dashboard", "Store",
  "Gallery", "Testimonials", "Blog", "Chatbot", "Newsletter", "File upload",
  "Client portal",
];

export const budgetOptions = ["Under $500", "$500–$1,500", "$1,500–$5,000", "$5,000+", "Not sure yet"];
export const timelineOptions = ["ASAP", "2–4 weeks", "1–2 months", "Flexible"];

export interface MockupRequest {
  businessName: string;
  businessType: string;
  colors: string;
  style: string;
  pages: string[];
  features: string[];
  inspiration: string;
  description: string;
  budget: string;
  timeline: string;
  contactName: string;
  email: string;
  phone: string;
}

export const emptyMockup: MockupRequest = {
  businessName: "",
  businessType: businessTypes[0],
  colors: "",
  style: styles[0],
  pages: ["Home"],
  features: ["Contact form"],
  inspiration: "",
  description: "",
  budget: budgetOptions[0],
  timeline: timelineOptions[0],
  contactName: "",
  email: "",
  phone: "",
};
