import { Link } from "react-router-dom";
import LogoMark from "../ui/LogoMark";

const cols = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/process", label: "Our Process" },
      { to: "/work", label: "Our Work" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/services", label: "All Services" },
      { to: "/mockup-builder", label: "Build a Mockup" },
      { to: "/domain-help", label: "Domain Help" },
      { to: "/contact", label: "Request a Redesign" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { to: "/contact", label: "Start My Website" },
      { to: "/contact?type=transfer", label: "Transfer My Website" },
      { to: "/contact?type=manage", label: "Manage My Website" },
      { to: "/contact?type=domain", label: "Connect My Domain" },
      { to: "/website-audit", label: "Free Website Audit" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <LogoMark imgClassName="h-14 w-14" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              A father-and-son design company building custom websites, domains,
              launches, and digital homes for businesses ready to grow.
            </p>
            <p className="mt-4 text-sm font-semibold text-lemon">Websites Made Fresh. 🍋</p>
          </div>
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream/90">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="focus-ring rounded text-sm text-cream/60 transition-colors hover:text-lemon">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} LemonMade Designs. All rights reserved.</p>
          <p className="text-xs text-cream/50">Built by Lemons. Designed to stand out.</p>
        </div>
      </div>
    </footer>
  );
}
