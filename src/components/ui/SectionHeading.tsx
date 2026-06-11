import ScrollReveal from "../animations/ScrollReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  headingLevel?: "h1" | "h2";
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  headingLevel = "h2",
  id,
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const Heading = headingLevel;

  return (
    <ScrollReveal className={`mb-12 max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-electric-soft">{eyebrow}</p>
      )}
      <Heading id={id} className="font-display text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {subtitle && <p className="mt-4 text-lg text-cream/70">{subtitle}</p>}
    </ScrollReveal>
  );
}
