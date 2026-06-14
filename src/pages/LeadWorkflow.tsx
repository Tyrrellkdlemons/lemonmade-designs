import { Link } from "react-router-dom";
import ScrollReveal from "../components/animations/ScrollReveal";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import usePageMeta from "../utils/usePageMeta";

const stages = [
  {
    number: "01",
    title: "Services",
    description: "Compare the 20 service paths, starting prices, timelines, and real examples.",
    to: "/services",
    action: "Explore Services",
  },
  {
    number: "02",
    title: "Request",
    description: "Open a service-specific brief with the exact questions LemonMade needs.",
    to: "/request/custom-website-creation",
    action: "Start a Request",
  },
  {
    number: "03",
    title: "Mockup",
    description: "Shape the pages, visual style, features, colors, and project direction.",
    to: "/mockup-builder",
    action: "Build a Mockup",
  },
  {
    number: "04",
    title: "Estimate",
    description: "Calculate a transparent starter range based on scope and upgrades.",
    to: "/estimate",
    action: "Get an Estimate",
  },
  {
    number: "05",
    title: "Submit",
    description: "Send the complete project direction to LemonMade through a protected form.",
    to: "/contact",
    action: "Submit a Project",
  },
  {
    number: "06",
    title: "Follow-up",
    description: "LemonMade reviews the request, confirms scope and pricing, then plans the build.",
    to: "/process",
    action: "See the Process",
  },
];

export default function LeadWorkflow() {
  usePageMeta(
    "Project Workflow",
    "Follow the LemonMade customer journey from service selection through request, mockup, estimate, submission, and personal follow-up."
  );

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Customer journey"
          title="From First Idea to Fresh Launch."
          subtitle="Move through the whole process in order, or jump directly to the step your project needs now."
          headingLevel="h1"
        />

        <ol className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage, index) => (
            <li key={stage.title}>
              <ScrollReveal delay={(index % 3) * 0.08} className="h-full">
                <Link
                  to={stage.to}
                  className="glass motion-surface group flex h-full flex-col p-6 transition-colors hover:border-lemon/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-4xl font-bold text-lemon/30">
                      {stage.number}
                    </span>
                    {index < stages.length - 1 && (
                      <span aria-hidden="true" className="text-xl text-electric-soft">→</span>
                    )}
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold text-cream">
                    {stage.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-cream/70">
                    {stage.description}
                  </p>
                  <span className="mt-6 text-sm font-bold text-electric-soft transition-colors group-hover:text-lemon">
                    {stage.action} →
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <ScrollReveal>
          <div className="glass motion-surface p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl font-bold text-cream">
              Start where you are.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-cream/70">
              Browse first, build a concept, calculate a range, or send the project details now.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/services" shine>Explore Services</Button>
              <Button to="/estimate" variant="secondary">Get an Estimate</Button>
              <Button to="/contact" variant="ghost">Start a Project</Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
