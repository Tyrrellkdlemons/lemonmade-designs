import { useReducedMotion } from "framer-motion";

/** Navy gradient + moving blue grid + floating lemon glows. Sits behind page content. */
export default function AnimatedBackground() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C2747_0%,#071A33_55%,#050B13_100%)]" />
      {/* moving blue grid */}
      <div
        className={`absolute inset-0 bg-grid-blue [background-size:48px_48px] ${reduce ? "" : "animate-grid-move"}`}
      />
      {/* lemon glow orbs */}
      <div className={`absolute -top-32 -left-32 h-96 w-96 rounded-full bg-lemon/10 blur-3xl ${reduce ? "" : "animate-glow-pulse"}`} />
      <div className={`absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-electric/10 blur-3xl ${reduce ? "" : "animate-glow-pulse"}`} style={{ animationDelay: "2s" }} />
      <div className={`absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-leaf/[0.07] blur-3xl ${reduce ? "" : "animate-glow-pulse"}`} style={{ animationDelay: "1s" }} />
    </div>
  );
}
