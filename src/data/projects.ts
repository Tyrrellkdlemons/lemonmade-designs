export interface Project {
  title: string;
  url: string;
  category: string;
  owner: string;
  description: string;
  embeddable: boolean;
}

export const projectCategories = [
  "All",
  "Business",
  "Nonprofit",
  "Food",
  "Insurance",
  "Portfolio",
  "Education",
  "Custom Brand",
] as const;

export const projects: Project[] = [
  {
    title: "OTM Workshops Portfolio",
    url: "https://otmworkshops-portfolio.netlify.app/",
    category: "Portfolio",
    owner: "Dad / OTM Workshops",
    description:
      "A portfolio-style site example showing creative workshop and website presentation work.",
    embeddable: true,
  },
  {
    title: "Indulging Treats",
    url: "https://indulging-treats.netlify.app/",
    category: "Food",
    owner: "LemonMade / TKDL",
    description:
      "A dessert brand website with visual flavor, ordering energy, and brand-forward design.",
    embeddable: true,
  },
  {
    title: "PacificSide Insurance",
    url: "https://pacificside-insurance.netlify.app/",
    category: "Insurance",
    owner: "LemonMade / TKDL",
    description: "A professional business website example for insurance services.",
    embeddable: true,
  },
  {
    title: "LoveRebel",
    url: "https://loverebel.netlify.app/",
    category: "Custom Brand",
    owner: "LemonMade / TKDL",
    description: "A bold custom brand website with personality and visual identity.",
    embeddable: true,
  },
  {
    title: "Erebus TK",
    url: "https://erebustk.netlify.app/",
    category: "Custom Brand",
    owner: "LemonMade / TKDL",
    description: "A custom themed web project example with strong visual direction.",
    embeddable: true,
  },
  {
    title: "Purely Gems LLC",
    url: "https://purelygemsllc.netlify.app/",
    category: "Business",
    owner: "LemonMade / TKDL",
    description:
      "A polished business e-commerce project with product storytelling and a customer-friendly storefront.",
    embeddable: true,
  },
  {
    title: "Success Stories Program TKDL",
    url: "https://success-stories-program-tkdl.netlify.app/",
    category: "Nonprofit",
    owner: "LemonMade / TKDL",
    description:
      "A program-focused site example built for storytelling and credibility.",
    embeddable: true,
  },
  {
    title: "Justice Education",
    url: "https://colleges.claremont.edu/justice-education/",
    category: "Education",
    owner: "Reference / Inspiration",
    description:
      "An education-focused reference site for structure, credibility, and institutional presentation.",
    embeddable: false,
  },
  {
    title: "Safe Haven for Empowerment",
    url: "https://safehavenforempowerment.org/",
    category: "Nonprofit",
    owner: "Reference / Inspiration",
    description:
      "A nonprofit-style reference for mission, services, and community impact.",
    embeddable: false,
  },
  {
    title: "Mable's Home",
    url: "https://mableshome.com/",
    category: "Business",
    owner: "Reference / Inspiration",
    description: "A warm business website reference with a customer-friendly feel.",
    embeddable: false,
  },
];
