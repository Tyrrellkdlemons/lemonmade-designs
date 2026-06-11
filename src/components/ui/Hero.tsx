import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import FloatingLemons from "../animations/FloatingLemons";

const logoAlt =
  "LemonMade Designs: two lemon characters building a website, with the tagline Websites Made Fresh";

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
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-4 pb-20 pt-3 sm:px-6 sm:pt-6 lg:grid-cols-2 lg:gap-12 lg:pb-16">
        <div className="text-center lg:text-left">
          <motion.p
            {...fadeUp(0)}
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-electric-soft sm:mb-5 sm:text-sm sm:tracking-[0.22em]"
          >
            Father-and-son website design
          </motion.p>
          <motion.h1 {...fadeUp(0.12)} className="font-display text-4xl font-bold leading-[1.02] text-cream min-[360px]:text-5xl sm:text-6xl lg:text-7xl">
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
          <motion.div
            {...fadeUp(0.2)}
            className="hero-mobile-art relative mx-auto mt-3 w-full max-w-[15rem] lg:hidden"
          >
            <div className="absolute inset-4 rounded-full bg-lemon/15 blur-2xl" aria-hidden="true" />
            <img
              src="/logo/lemonmade-logo-720.png"
              alt={logoAlt}
              width="720"
              height="457"
              fetchPriority="high"
              decoding="async"
              className={`brand-floating relative w-full ${reduce ? "" : "animate-float-slow"}`}
            />
          </motion.div>
          <motion.p {...fadeUp(0.24)} className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-cream/75 sm:mt-6 sm:text-lg lg:mx-0">
            A father-and-son design company building custom websites, domains,
            launches, and digital homes for businesses ready to grow.
          </motion.p>
          <motion.div {...fadeUp(0.36)} className="mt-5 grid grid-cols-2 gap-3 sm:mt-9 lg:flex lg:flex-wrap lg:justify-start lg:gap-4">
            <Button to="/contact" shine className="col-span-2 w-full sm:col-span-1 lg:w-auto">Start My Website</Button>
            <Button to="/work" variant="secondary" className="w-full !px-4 text-sm lg:w-auto lg:!px-8 lg:text-base">View Our Work</Button>
            <Button to="/mockup" variant="ghost" className="w-full !px-4 text-sm lg:w-auto lg:!px-8 lg:text-base">Quick Mockup</Button>
          </motion.div>
          <motion.p {...fadeUp(0.48)} className="mt-4 hidden text-sm tracking-wide text-cream/50 sm:block lg:mt-7">
            🍋 Built by Lemons. Designed to stand out.
          </motion.p>
        </div>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-desktop-art relative hidden lg:block"
        >
          <div aria-hidden="true" className={`hero-orbit absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-electric/25 ${reduce ? "" : "animate-spin-slow"}`}>
            <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-lemon shadow-glow" />
            <span className="absolute bottom-[12%] right-0 h-3 w-3 rounded-full bg-leaf shadow-[0_0_18px_rgba(126,217,87,0.5)]" />
          </div>
          <div className="absolute inset-x-10 inset-y-6 rounded-full bg-lemon/15 blur-3xl" aria-hidden="true" />
          <img
            src="/logo/lemonmade-logo-full.png"
            srcSet="/logo/lemonmade-logo-720.png 720w, /logo/lemonmade-logo-full.png 1200w"
            sizes="(min-width: 1024px) 46vw, 88vw"
            alt={logoAlt}
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
        className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center sm:bottom-5"
      >
        <button
          type="button"
          onClick={scrollToNext}
          aria-label="Scroll down to featured work"
          className="focus-ring pointer-events-auto group flex flex-col items-center gap-1 rounded-full px-4 py-1 text-cream/60 transition-colors hover:text-lemon sm:gap-1.5 sm:py-1.5"
        >
          <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.3em] sm:block">Scroll</span>
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
