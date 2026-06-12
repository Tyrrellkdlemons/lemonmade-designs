import WebsiteAuditForm from "../components/forms/WebsiteAuditForm";
import CTASection from "../components/ui/CTASection";
import SectionHeading from "../components/ui/SectionHeading";
import usePageMeta from "../utils/usePageMeta";

export default function WebsiteAudit() {
  usePageMeta(
    "Free Website Audit",
    "Request a free LemonMade website review covering mobile layout, speed, SEO basics, domain and SSL, forms, branding, and calls to action."
  );

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Free website audit"
          title="Find the Best Place to Improve."
          subtitle="Tell us what feels wrong. We'll review the essentials and recommend a practical next step without requiring a paid scanner."
          headingLevel="h1"
        />
        <WebsiteAuditForm />
      </section>
      <CTASection
        title="Ready to fix what the audit finds?"
        subtitle="Request the matching service, build a quick mockup, or compare our real project examples."
      />
    </>
  );
}
