import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const codeLines = [
  "<header> Your Brand </header>",
  "const site = makeFresh(idea);",
  "site.connectDomain('🍋');",
  "deploy(site).then(grow);",
];

/** Animated browser window typing code, with rotating lemon badge. */
export default function AnimatedLemonCodeBadge() {
  const reduce = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) {
      setChars(codeLines[0].length);
      return;
    }
    const line = codeLines[lineIdx];
    if (chars < line.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 55);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setChars(0);
      setLineIdx((i) => (i + 1) % codeLines.length);
    }, 1800);
    return () => clearTimeout(t);
  }, [chars, lineIdx, reduce]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* rotating lemon slice badge */}
      <div
        aria-hidden="true"
        className={`absolute -top-8 -right-6 z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-lemon bg-navy-light text-4xl shadow-glow ${reduce ? "" : "animate-spin-slow"}`}
      >
        🍋
      </div>
      {/* browser window */}
      <div className="glass overflow-hidden shadow-card">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-lemon/80" />
          <span className="h-3 w-3 rounded-full bg-leaf/80" />
          <span className="ml-3 rounded-md bg-navy/60 px-3 py-0.5 text-xs text-electric-soft">
            lemonmade.dev
          </span>
        </div>
        <div className="min-h-[120px] p-5 font-mono text-sm text-leaf">
          <p className="mb-2 text-electric-soft">// websites made fresh</p>
          <p>
            {codeLines[lineIdx].slice(0, chars)}
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-lemon" />
          </p>
        </div>
        <div className="border-t border-white/10 bg-gradient-to-r from-lemon/10 via-electric/10 to-leaf/10 px-5 py-3 text-xs text-cream/70">
          ✓ Build passing · ✓ Mobile ready · ✓ Deployed to Netlify
        </div>
      </div>
    </div>
  );
}
