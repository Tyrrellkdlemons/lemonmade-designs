import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import AnimatedLemonCodeBadge from "../animations/AnimatedLemonCodeBadge";
import FloatingLemons from "../animations/FloatingLemons";

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] as const },
  });

  return (
    <section className="relative overflow-hidden">
      <FloatingLemons />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:pb-28 lg:pt-20">
        <div className="text-center lg:text-left">
          <motion.img
            {...fadeUp(0)}
            src="/logo/lemonmade-logo-md.png"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-8 h-24 w-auto drop-shadow-[0_0_30px_rgba(255,210,26,0.35)] sm:h-32 lg:mx-0"
          />
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
        >
          <AnimatedLemonCodeBadge />
        </motion.div>
      </div>
    </section>
  );
}
