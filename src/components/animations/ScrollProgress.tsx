import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin branded progress line that shows how far the visitor has moved down the page. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.22,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-lemon via-lemon-soft to-leaf shadow-[0_0_16px_rgba(255,210,26,0.55)]"
      style={{ scaleX: reduce ? scrollYProgress : smoothProgress }}
    />
  );
}
