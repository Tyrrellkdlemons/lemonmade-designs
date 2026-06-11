import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/animations/ScrollReveal";
import CTASection from "../components/ui/CTASection";

const values = [
  { icon: "👨‍👦", title: "Family-built", text: "A father-and-son team. Two generations, one standard: make it excellent." },
  { icon: "🍋", title: "Fresh by design", text: "Our last name is Lemons — so 'made fresh' isn't a slogan, it's the family brand." },
  { icon: "🛠️", title: "Custom, always", text: "No recycled templates. Every site is designed and built for the business it serves." },
  { icon: "🤝", title: "Here after launch", text: "We don't disappear when the site goes live. We manage, maintain, and grow with you." },
];

export default function About() {
  usePageMeta(
    "About Us",
    "LemonMade Designs is a father-and-son website creation company built around family, creativity, technology, and the Lemons name."
  );
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
        <SectionHeading
          eyebrow="About us"
          title="The Lemons Behind LemonMade."
          headingLevel="h1"
        />
        <ScrollReveal>
          <img
            src="/logo/lemonmade-logo-full.jpg"
            srcSet="/logo/lemonmade-logo-md.jpg 900w, /logo/lemonmade-logo-full.jpg 1200w"
            sizes="(min-width: 768px) 720px, 92vw"
            alt="LemonMade Designs: two lemon characters building a website, with the tagline Websites Made Fresh"
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            className="brand-artwork mx-auto mb-10 w-full max-w-3xl"
          />
          <div className="space-y-5 text-left text-lg leading-relaxed text-cream/80 sm:text-center">
            <p>
              LemonMade Designs is a father-and-son website creation company built around
              family, creativity, technology, and the Lemons name. The idea is simple:
              our last name is Lemons, and the websites are made by us —{" "}
              <strong className="text-lemon">LemonMade</strong>.
            </p>
            <p>
              We create websites that feel fresh, custom, functional, and made with care.
              Every project gets two sets of eyes, two generations of perspective, and one
              shared promise: your website should work as good as it looks.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="our-values">
        <SectionHeading id="our-values" eyebrow="What we stand for" title="Made With Care. Every Time." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.08}>
              <div className="glass h-full p-6 text-center transition-colors hover:border-lemon/40">
                <span aria-hidden="true" className="text-4xl">{v.icon}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-cream">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{v.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Let's make something fresh together."
        subtitle="Whether you're starting from scratch or fixing what you have — we'd love to hear your idea."
      />
    </>
  );
}
