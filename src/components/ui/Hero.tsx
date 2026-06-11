import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import FloatingLemons from "../animations/FloatingLemons";

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] as const },
  });

  function scrollToNext() {
    document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden">
      <FloatingLemons />
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="text-center lg:text-left">
          <motion.p
            {...fadeUp(0)}
            className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-electric-soft"
          >
            Father-and-son website design
          </motion.p>
          <motion.h1 {...fadeUp(0.12)} className="font-display text-5xl font-bold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            Websites Made <span className="text-gradient-lemon relative inline-block">
              Fresh.
              {!reduce && (
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 200 16"
                  className="absolute -bottom-2 left-0 w-full"
                  initial={{ pathLength: 0 }}
                >
                  <motion.path
                    d="M4 11 C 60 3, 140 3, 196 9"
                    fill="none"
                    stroke="#FFD21A"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 1 }}
                  />
                </motion.svg>
              )}
            </span>
          </motion.h1>
          <motion.p {...fadeUp(0.24)} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/75 lg:mx-0">
            A father-and-son design company building custom websites, domains,
            launches, and digital homes for businesses ready to grow.
          </motion.p>
          <motion.div {...fadeUp(0.36)} className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button to="/contact" shine>Start My Website</Button>
            <Button to="/work" variant="secondary">View Our Work</Button>
            <Button to="/mockup" variant="ghost">Build a Quick Mockup</Button>
          </motion.div>
          <motion.p {...fadeUp(0.48)} className="mt-7 text-sm tracking-wide text-cream/50">
            🍋 Built by Lemons. Designed to stand out.
          </motion.p>
        </div>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-x-10 inset-y-6 rounded-full bg-lemon/15 blur-3xl" aria-hidden="true" />
          <img
            src="/logo/lemonmade-logo-full.png"
            srcSet="/logo/lemonmade-logo-720.png 720w, /logo/lemonmade-logo-full.png 1200w"
            sizes="(min-width: 1024px) 46vw, 88vw"
            alt="LemonMade Designs: two lemon characters building a website, with the tagline Websites Made Fresh"
            width="1200"
            height="762"
            fetchPriority="high"
            decoding="async"
            className={`brand-floating relative mx-auto w-full max-w-xl ${reduce ? "" : "animate-float-slow"}`}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(0.9)}
        className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center"
      >
        <button
          type="button"
          onClick={scrollToNext}
          aria-label="Scroll down to featured work"
          className="focus-ring pointer-events-auto group flex flex-col items-center gap-1.5 rounded-full px-4 py-1.5 text-cream/60 transition-colors hover:text-lemon"
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <span
            aria-hidden="true"
            className={`flex h-9 w-6 items-start justify-center rounded-full border-2 border-current pt-1.5`}
          >
            <span className={`h-2 w-1 rounded-full bg-current ${reduce ? "" : "animate-scroll-dot"}`} />
          </span>
        </button>
      </motion.div>
    </section>
  );
}
