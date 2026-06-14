import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import MockupBuilderForm from "../components/mockup/MockupBuilderForm";

export default function MockupBuilder() {
  usePageMeta(
    "Build a Mockup",
    "Use the LemonMade mockup builder to describe your dream website — pick pages, features, style, and colors, and we'll create a fresh design concept."
  );
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Mockup builder"
        title="Design Your Dream Site in 2 Minutes."
        subtitle="Pick your pages, style, and features. Build a clear concept, review the starter range, then request your project quote."
        headingLevel="h1"
      />
      <MockupBuilderForm />
    </section>
  );
}
