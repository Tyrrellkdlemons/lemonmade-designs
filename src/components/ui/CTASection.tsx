import ScrollReveal from "../animations/ScrollReveal";
import Button from "./Button";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  title = "Ready for a website made fresh?",
  subtitle = "Tell us your idea. We'll handle the design, build, domain, launch, and growth.",
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <ScrollReveal>
        <div className="glass relative overflow-hidden p-10 text-center sm:p-14">
          <div aria-hidden="true" className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-lemon/15 blur-3xl" />
          <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">{subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" shine>Start My Website</Button>
            <Button to="/work" variant="secondary">View Our Work</Button>
          </div>
          <p className="mt-6 text-sm text-cream/50">Built by Lemons. Designed to stand out.</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
