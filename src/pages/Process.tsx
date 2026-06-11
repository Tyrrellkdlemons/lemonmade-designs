import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import ProcessTimeline from "../components/ui/ProcessTimeline";
import CTASection from "../components/ui/CTASection";

export default function Process() {
  usePageMeta(
    "Our Process",
    "How LemonMade Designs takes you from idea to launched website — mockup, custom build, domain and hosting setup, launch, and ongoing management."
  );
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Our process"
          title="From Lemon Idea to Live Website."
          subtitle="Seven clear steps. You always know where your project stands — and you see the design before we build."
        />
        <ProcessTimeline />
      </section>
      <CTASection
        title="Step one starts with you."
        subtitle="Tell us your idea today and we'll have a fresh direction back to you fast."
      />
    </>
  );
}
