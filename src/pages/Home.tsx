import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import usePageMeta from "../utils/usePageMeta";
import Hero from "../components/ui/Hero";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/animations/ScrollReveal";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import { projects } from "../data/projects";

const featured = projects.filter((p) => p.embeddable).slice(0, 4);

const capabilities = [
  { icon: "🍋", label: "Custom builds", to: "/services" },
  { icon: "🌐", label: "Domains & DNS", to: "/domains" },
  { icon: "✨", label: "Redesigns", to: "/contact?type=redesign" },
  { icon: "🖼️", label: "Project mockups", to: "/mockup" },
  { icon: "🚀", label: "Hosting & launch", to: "/process" },
  { icon: "🧭", label: "Site management", to: "/contact?type=manage" },
];

export default function Home() {
  const reduce = useReducedMotion();
  usePageMeta(
    "Websites Made Fresh",
    "LemonMade Designs builds custom websites, handles domains and hosting, redesigns outdated sites, and manages your online presence. A father-and-son web design company."
  );

  return (
    <>
      <Hero />

      {/* Featured work */}
      <section id="featured-work" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6" aria-labelledby="featured-heading">
        <SectionHeading
          id="featured-heading"
          eyebrow="Featured projects"
          title="Fresh Websites. Real Results."
          subtitle="Real sites we've built — browse them live, then request one like it."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <Link
                to="/work"
                className="glass focus-ring group block overflow-hidden p-5 transition-all hover:-translate-y-1.5 hover:border-lemon/40"
              >
                <div aria-hidden="true" className="mb-4 rounded-lg border border-white/10 bg-navy-light p-3">
                  <div className="mb-2 flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/70" />
                    <span className="h-2 w-2 rounded-full bg-lemon/70" />
                    <span className="h-2 w-2 rounded-full bg-leaf/70" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-2/3 rounded bg-lemon/30" />
                    <div className="h-1.5 w-full rounded bg-white/10" />
                    <div className="h-1.5 w-4/5 rounded bg-white/10" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-cream group-hover:text-lemon">{p.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-electric-soft">{p.category}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.2} className="mt-8 text-center">
          <Button to="/work" variant="secondary">Explore All Projects</Button>
        </ScrollReveal>
      </section>

      {/* Everything handled — compact capability strip */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="capabilities-heading">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="What we do"
          title="Launch, Transfer, Manage, Grow."
          subtitle="One team for everything your website needs — explore the details on each page."
        />
        <ScrollReveal>
          <ul className="flex flex-wrap justify-center gap-3">
            {capabilities.map((c, index) => (
              <motion.li
                key={c.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.055 }}
                whileHover={reduce ? undefined : { y: -4, rotate: index % 2 === 0 ? -1 : 1 }}
              >
                <Link
                  to={c.to}
                  className="focus-ring glass motion-surface inline-flex items-center gap-2.5 !rounded-full px-5 py-3 text-sm font-semibold text-cream/85 transition-all hover:border-lemon/50 hover:text-lemon"
                >
                  <motion.span
                    aria-hidden="true"
                    className="text-lg"
                    whileHover={reduce ? undefined : { rotate: [0, -12, 12, 0], scale: 1.18 }}
                    transition={{ duration: 0.45 }}
                  >
                    {c.icon}
                  </motion.span>
                  {c.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
