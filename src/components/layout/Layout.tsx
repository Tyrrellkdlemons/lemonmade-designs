import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedBackground from "../animations/AnimatedBackground";
import CursorGlow from "../animations/CursorGlow";
import ScrollProgress from "../animations/ScrollProgress";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-lemon focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />
      <motion.main
        id="main-content"
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
