import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import PricingCard from "../components/ui/PricingCard";
import FAQAccordion from "../components/ui/FAQAccordion";
import CTASection from "../components/ui/CTASection";
import ScrollReveal from "../components/animations/ScrollReveal";
import { pricingTiers } from "../data/pricing";
import { faqs } from "../data/faqs";

export default function Pricing() {
  usePageMeta(
    "Pricing",
    "Clear website packages from LemonMade Designs — Fresh Start landing pages, Business Made full sites, LemonPro advanced builds, and fully custom projects."
  );
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple Packages. Custom Quotes."
          subtitle="Start with a package that fits — we'll tailor the final quote to exactly what you need."
          headingLevel="h1"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((t, i) => (
            <PricingCard key={t.name} tier={t} index={i} />
          ))}
        </div>
        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-cream/55">
            Final pricing depends on pages, features, timeline, integrations, and content.
          </p>
        </ScrollReveal>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-labelledby="pricing-faq">
        <SectionHeading id="pricing-faq" eyebrow="FAQ" title="Good Questions. Honest Answers." />
        <FAQAccordion items={faqs} />
      </section>
      <CTASection />
    </>
  );
}
