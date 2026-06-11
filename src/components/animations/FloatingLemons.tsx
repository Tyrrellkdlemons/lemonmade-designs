import { useReducedMotion } from "framer-motion";

const items = [
  { emoji: "🍋", top: "12%", left: "6%", size: "text-4xl", anim: "animate-float", delay: "0s" },
  { emoji: "🍃", top: "22%", left: "88%", size: "text-3xl", anim: "animate-float-slow", delay: "1.2s" },
  { emoji: "🍋", top: "68%", left: "92%", size: "text-2xl", anim: "animate-float", delay: "2s" },
  { emoji: "✨", top: "78%", left: "8%", size: "text-2xl", anim: "animate-float-slow", delay: "0.6s" },
  { emoji: "🖱️", top: "40%", left: "3%", size: "text-2xl", anim: "animate-float", delay: "2.6s" },
  { emoji: "🍃", top: "85%", left: "70%", size: "text-3xl", anim: "animate-float-slow", delay: "1.8s" },
];

/** Decorative floating lemon slices, leaves, cursor and sparkles. */
export default function FloatingLemons() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <span
          key={i}
          className={`absolute opacity-30 ${it.size} ${it.anim}`}
          style={{ top: it.top, left: it.left, animationDelay: it.delay }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
