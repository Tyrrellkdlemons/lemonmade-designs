import WebsiteAuditForm from "../components/forms/WebsiteAuditForm";
import CTASection from "../components/ui/CTASection";
import SectionHeading from "../components/ui/SectionHeading";
import usePageMeta from "../utils/usePageMeta";

export default function WebsiteAudit() {
  usePageMeta(
    "Starter Website Review",
    "Request a LemonMade starter website review covering mobile layout, speed, SEO, domain and SSL, forms, accessibility, content, trust, branding, and calls to action."
  );

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Starter Website Review"
          title="Find the Best Place to Improve."
          subtitle="Tell us what feels wrong. We'll prepare a practical human review and recommend the strongest paid improvement path without pretending to run an automated scan."
          headingLevel="h1"
        />
        <WebsiteAuditForm />
      </section>
      <CTASection
        title="Get a quote for fixes."
        subtitle="Request the matching service, build a quick mockup, or compare our real project examples before starting paid improvements."
      />
    </>
  );
}
