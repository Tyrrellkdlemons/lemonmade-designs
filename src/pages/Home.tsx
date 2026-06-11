import { Link } from "react-router-dom";
import usePageMeta from "../utils/usePageMeta";
import Hero from "../components/ui/Hero";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/animations/ScrollReveal";
import ServiceCard from "../components/ui/ServiceCard";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import { services } from "../data/services";
import { projects } from "../data/projects";

const miniProcess = [
  { icon: "💡", label: "Your idea" },
  { icon: "🖼️", label: "Fresh mockup" },
  { icon: "⚙️", label: "Custom build" },
  { icon: "🚀", label: "Launch & grow" },
];

const featured = projects.filter((p) => p.embeddable).slice(0, 4);

export default function Home() {
  usePageMeta(
    "Websites Made Fresh",
    "LemonMade Designs builds custom websites, handles domains and hosting, redesigns outdated sites, and manages your online presence. A father-and-son web design company."
  );

  return (
    <>
      <Hero />

      {/* Mini process preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="process-preview">
        <SectionHeading eyebrow="How it works" title="From Lemon Idea to Live Website." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {miniProcess.map((step, i) => (
            <ScrollReveal key={step.label} delay={i * 0.1}>
              <div className="glass relative flex flex-col items-center gap-3 p-6 text-center">
                <span aria-hidden="true" className="text-3xl">{step.icon}</span>
                <p className="font-display font-semibold text-cream">{step.label}</p>
                {i < miniProcess.length - 1 && (
                  <span aria-hidden="true" className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-lemon sm:block">→</span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3} className="mt-8 text-center">
          <Button to="/process" variant="ghost">See the Full Process</Button>
        </ScrollReveal>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="featured-work">
        <SectionHeading
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

      {/* Services teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="services-teaser">
        <SectionHeading
          eyebrow="What we do"
          title="Launch, Transfer, Manage, Grow."
          subtitle="Everything your website needs — creation, domains, hosting, redesigns, and ongoing care."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
        <ScrollReveal delay={0.2} className="mt-8 text-center">
          <Button to="/services" variant="ghost">See All {services.length} Services</Button>
        </ScrollReveal>
      </section>

      {/* Trust / quality statement */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <ScrollReveal>
          <blockquote className="glass relative overflow-hidden p-10 text-center sm:p-14">
            <span aria-hidden="true" className="absolute -left-6 -top-6 text-8xl opacity-10">🍋</span>
            <p className="font-display text-2xl font-semibold leading-relaxed text-cream sm:text-3xl">
              "Built Custom, Not Cookie-Cutter. Your website should work as good as it looks —
              and we put our family name on every one we make."
            </p>
            <footer className="mt-6 text-sm font-semibold uppercase tracking-widest text-electric-soft">
              — The Lemons, Father & Son
            </footer>
          </blockquote>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
