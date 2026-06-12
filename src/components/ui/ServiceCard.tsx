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
      whileHover={reduce ? undefined : { y: -8, rotateX: 1.2, rotateY: index % 2 === 0 ? -1.2 : 1.2 }}
      className="glass motion-surface group flex h-full flex-col p-6 transition-colors hover:border-lemon/40"
      style={{ transformPerspective: 900 }}
    >
      <div className="flex items-start justify-between gap-3">
        <motion.span
          aria-hidden="true"
          className="inline-block origin-bottom-left text-3xl"
          whileHover={reduce ? undefined : { rotate: [0, -10, 8, 0], scale: 1.16 }}
          transition={{ duration: 0.5 }}
        >
          {service.icon}
        </motion.span>
        <span className="rounded-full border border-electric/20 bg-electric/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-electric-soft">
          {service.category}
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold text-cream">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{service.shortDescription}</p>
      <div className="mt-5 grid gap-2">
        <Link
          to={`/request/${service.id}`}
          className="focus-ring rounded-full bg-lemon px-4 py-2.5 text-center text-sm font-bold text-navy shadow-[0_0_24px_rgba(255,210,26,0.15)] transition-transform hover:-translate-y-0.5"
        >
          Request This Service
        </Link>
        {service.exampleProjectUrl ? (
          <a
            href={service.exampleProjectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-full border border-electric/45 px-4 py-2.5 text-center text-sm font-semibold text-electric-soft hover:bg-electric/10"
          >
            See Example
          </a>
        ) : (
          <Link
            to="/work"
            className="focus-ring rounded-full border border-electric/45 px-4 py-2.5 text-center text-sm font-semibold text-electric-soft hover:bg-electric/10"
          >
            See Example
          </Link>
        )}
        <Link
          to={`/mockup-builder?service=${encodeURIComponent(service.id)}`}
          className="focus-ring rounded-full border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-cream/75 hover:border-lemon/45 hover:text-lemon"
        >
          Build Quick Mockup
        </Link>
      </div>
    </motion.div>
  );
}
