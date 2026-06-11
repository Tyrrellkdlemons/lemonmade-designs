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
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
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
