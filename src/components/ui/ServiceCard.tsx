import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Service } from "../../data/services";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="glass group flex flex-col p-6 transition-colors hover:border-lemon/40"
    >
      <span aria-hidden="true" className="mb-4 text-3xl">{service.icon}</span>
      <h3 className="font-display text-lg font-semibold text-cream">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{service.description}</p>
      <Link
        to={`/contact?service=${encodeURIComponent(service.title)}`}
        className="focus-ring mt-5 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-semibold text-lemon transition-colors group-hover:text-lemon-soft"
      >
        Request this <span aria-hidden="true">→</span>
      </Link>
    </motion.div>
  );
}
