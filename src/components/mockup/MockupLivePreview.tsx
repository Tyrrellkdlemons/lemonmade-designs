import { motion, useReducedMotion } from "framer-motion";
import type { MockupRequest } from "./mockupOptions";

const colorMap: Record<string, string> = {
  red: "#ef4444",
  orange: "#f97316",
  yellow: "#ffd21a",
  green: "#7ed957",
  blue: "#0ea5e9",
  purple: "#a855f7",
  pink: "#ec4899",
  black: "#111827",
  navy: "#071a33",
  cream: "#fff8d6",
};

function paletteFromInput(input: string): string[] {
  const selected = Object.entries(colorMap)
    .filter(([name]) => input.toLowerCase().includes(name))
    .map(([, value]) => value)
    .slice(0, 3);
  return selected.length > 0 ? selected : ["#ffd21a", "#0ea5e9", "#7ed957"];
}

export default function MockupLivePreview({ request }: { request: MockupRequest }) {
  const reduce = useReducedMotion();
  const palette = paletteFromInput(request.colors);
  const pages = request.pages.length > 0 ? request.pages : ["Home"];
  const features = request.features.length > 0 ? request.features : ["Contact form"];

  return (
    <motion.aside
      aria-label="Live website mockup preview"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="glass motion-surface overflow-hidden lg:sticky lg:top-24"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-lemon" />
          <span className="h-2.5 w-2.5 rounded-full bg-leaf" />
        </div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cream/45">
          Live preview
        </p>
      </div>

      <motion.div
        aria-label="Hero preview"
        animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="relative min-h-60 overflow-hidden p-7"
        style={{
          backgroundImage: `linear-gradient(135deg, ${palette[0]}33, ${palette[1]}24 50%, ${palette[2]}2b)`,
          backgroundSize: "200% 200%",
        }}
      >
        <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full blur-3xl" style={{ backgroundColor: `${palette[0]}35` }} />
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: palette[1] }}>
          {request.businessType}
        </p>
        <h2 className="relative mt-5 max-w-md font-display text-4xl font-bold leading-tight text-cream">
          {request.businessName || "Your Business"}
        </h2>
        <p className="relative mt-3 max-w-md text-sm leading-relaxed text-cream/70">
          {request.description || `${request.style} website concept with a clear message and a fresh customer path.`}
        </p>
        <span
          className="relative mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-bold text-navy"
          style={{ backgroundColor: palette[0] }}
        >
          Main call to action
        </span>
      </motion.div>

      <div className="space-y-6 p-5">
        <section aria-labelledby="color-preview-title">
          <h3 id="color-preview-title" className="text-xs font-bold uppercase tracking-wider text-cream/50">
            Color preview
          </h3>
          <div className="mt-2 flex gap-2">
            {palette.map((color) => (
              <motion.span
                key={color}
                aria-label={color}
                whileHover={reduce ? undefined : { y: -4, scale: 1.08 }}
                className="h-10 flex-1 rounded-xl border border-white/15"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="page-list-preview-title">
          <h3 id="page-list-preview-title" className="text-xs font-bold uppercase tracking-wider text-cream/50">
            Page list preview
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {pages.map((page) => (
              <span key={page} className="rounded-full border border-electric/25 bg-electric/10 px-3 py-1.5 text-xs font-semibold text-electric-soft">
                {page}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby="feature-badges-title">
          <h3 id="feature-badges-title" className="text-xs font-bold uppercase tracking-wider text-cream/50">
            Feature badges
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {features.map((feature) => (
              <span key={feature} className="rounded-full border border-leaf/25 bg-leaf/10 px-3 py-1.5 text-xs font-semibold text-leaf">
                ✓ {feature}
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.aside>
  );
}
