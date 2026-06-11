import ScrollReveal from "../animations/ScrollReveal";
import { motion, useReducedMotion } from "framer-motion";

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
  const reduce = useReducedMotion();

  return (
    <ScrollReveal className={`mb-12 max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-electric-soft">
          <motion.span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-lemon shadow-[0_0_12px_rgba(255,210,26,0.65)]"
            animate={reduce ? undefined : { scale: [1, 1.45, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {eyebrow}
        </p>
      )}
      <Heading id={id} className="font-display text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      <motion.span
        aria-hidden="true"
        className={`mt-4 block h-1 rounded-full bg-gradient-to-r from-lemon via-electric to-leaf ${
          align === "center" ? "mx-auto" : ""
        }`}
        initial={reduce ? { width: 56 } : { width: 0, opacity: 0 }}
        whileInView={{ width: 56, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15 }}
      />
      {subtitle && <p className="mt-4 text-lg text-cream/70">{subtitle}</p>}
    </ScrollReveal>
  );
}
