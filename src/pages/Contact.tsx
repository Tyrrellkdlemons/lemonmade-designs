import { Link } from "react-router-dom";
import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/animations/ScrollReveal";
import ContactForm from "../components/forms/ContactForm";

const quickLinks = [
  { to: "/contact?type=redesign", label: "Request a Redesign", icon: "✨" },
  { to: "/domains", label: "Request Domain Help", icon: "🌐" },
  { to: "/contact?type=manage", label: "Need us to manage your site?", icon: "🧭" },
  { to: "/mockup", label: "Build a Quick Mockup", icon: "🖼️" },
];

export default function Contact() {
  usePageMeta(
    "Start Your Project",
    "Start your website project with LemonMade Designs — new builds, redesigns, transfers, domain help, and managed websites. Tell us your idea."
  );
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Start your project"
        title="Tell Us Your Idea."
        subtitle="Fill this out and we'll reply with a clear plan, honest pricing, and a fresh direction — usually within one business day."
      />
      <ScrollReveal>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {quickLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="focus-ring rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:border-lemon/50 hover:text-lemon"
            >
              <span aria-hidden="true" className="mr-1.5">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ContactForm />
      </ScrollReveal>
    </section>
  );
}
