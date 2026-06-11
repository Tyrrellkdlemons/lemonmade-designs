import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import type { PricingTier } from "../../data/pricing";

export default function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`glass relative flex flex-col p-8 ${
        tier.highlighted ? "border-lemon/50 shadow-glow" : ""
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-lemon px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy">
          Most Popular
        </span>
      )}
      <h3 className="font-display text-2xl font-bold text-cream">{tier.name}</h3>
      <p className="mt-1 text-sm text-electric-soft">{tier.tagline}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-cream/80">
            <span aria-hidden="true" className="mt-0.5 text-leaf">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Button
        to={`/contact?package=${encodeURIComponent(tier.name)}`}
        variant={tier.highlighted ? "primary" : "ghost"}
        className="mt-8 w-full"
      >
        Get a Quote
      </Button>
    </motion.div>
  );
}
