import { motion, useReducedMotion } from "framer-motion";

const steps = [
  { icon: "💡", title: "Tell us your idea", text: "Share your business, your goals, and what you want your website to do." },
  { icon: "🎨", title: "Pick a style or example", text: "Browse our work, pick a direction, or describe the vibe you're going for." },
  { icon: "🖼️", title: "We create a mockup", text: "You'll see a fresh design concept before we build a single page." },
  { icon: "⚙️", title: "We build the site", text: "Custom code, smooth animations, mobile-ready — built by hand, not templates." },
  { icon: "🌐", title: "We connect domain & hosting", text: "Domain, DNS, SSL, hosting — all the technical stuff handled for you." },
  { icon: "🚀", title: "We launch", text: "Your site goes live, fast and polished, ready for the world to see." },
  { icon: "📈", title: "We manage & improve", text: "Updates, fixes, and growth — we stick around as your website team." },
];

export default function ProcessTimeline() {
  const reduce = useReducedMotion();
  return (
    <ol className="relative mx-auto max-w-3xl">
      <div aria-hidden="true" className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-lemon via-electric to-leaf sm:left-[31px]" />
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="relative mb-8 flex gap-5 pl-0 last:mb-0"
        >
          <motion.span
            aria-hidden="true"
            className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-lemon/60 bg-navy-light text-2xl shadow-glow sm:h-16 sm:w-16"
            whileHover={reduce ? undefined : { rotate: 8, scale: 1.12 }}
            transition={{ type: "spring", stiffness: 360, damping: 18 }}
          >
            {step.icon}
          </motion.span>
          <div className="glass motion-surface flex-1 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-electric-soft">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-lg font-bold text-cream">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-cream/70">{step.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
