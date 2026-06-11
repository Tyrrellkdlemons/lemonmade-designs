import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import DevicePreviewToggle, { type Device } from "./DevicePreviewToggle";
import IframePreview from "./IframePreview";

export default function ProjectPreviewCard({ project, index }: { project: Project; index: number }) {
  const [device, setDevice] = useState<Device>("desktop");
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="glass overflow-hidden p-5 transition-colors hover:border-electric/40"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-cream">{project.title}</h3>
          <p className="mt-0.5 text-xs uppercase tracking-wider text-electric-soft">
            {project.category} · {project.owner}
          </p>
        </div>
        <DevicePreviewToggle value={device} onChange={setDevice} />
      </div>
      <IframePreview project={project} device={device} />
      <p className="mt-4 text-sm leading-relaxed text-cream/70">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-cream hover:border-lemon/60 hover:text-lemon"
        >
          Open Live Site ↗
        </a>
        <Link
          to={`/mockup?inspiration=${encodeURIComponent(project.title)}`}
          className="focus-ring rounded-full bg-lemon/10 px-4 py-2 text-sm font-semibold text-lemon hover:bg-lemon/20"
        >
          Request one like this
        </Link>
      </div>
    </motion.article>
  );
}
