import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import ServiceCard from "../components/ui/ServiceCard";
import CTASection from "../components/ui/CTASection";
import { services } from "../data/services";

export default function Services() {
  usePageMeta(
    "Services",
    "Custom website creation, redesigns, domain setup, hosting, Netlify deployment, SEO, website management, and more — all handled by LemonMade Designs."
  );
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Everything Your Website Needs."
          subtitle="From the first idea to years of growth — we create, launch, connect, transfer, redesign, and manage."
          headingLevel="h1"
        />
        <div className="mb-8 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-cream/55">
          <span className="rounded-full border border-lemon/25 bg-lemon/5 px-3 py-1.5">20 working request flows</span>
          <span className="rounded-full border border-electric/25 bg-electric/5 px-3 py-1.5">Protected request forms</span>
          <span className="rounded-full border border-leaf/25 bg-leaf/5 px-3 py-1.5">No paid API required</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>
      <CTASection
        title="Not sure what you need?"
        subtitle="Describe your business and your goal — we'll recommend the right combination and give you a clear quote."
      />
    </>
  );
}
