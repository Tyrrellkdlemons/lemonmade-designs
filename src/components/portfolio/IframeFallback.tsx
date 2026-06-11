import type { Project } from "../../data/projects";
import { Link } from "react-router-dom";

export default function IframeFallback({ project }: { project: Project }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#0C2747_0%,#071A33_80%)] p-6 text-center">
      {/* generated preview shell */}
      <div aria-hidden="true" className="w-full max-w-[260px] rounded-xl border border-white/15 bg-navy/70 p-3 shadow-card">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-lemon/70" />
          <span className="h-2 w-2 rounded-full bg-leaf/70" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded bg-lemon/30" />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-5/6 rounded bg-white/10" />
          <div className="mt-3 h-7 w-24 rounded-full bg-electric/40" />
        </div>
      </div>
      <p className="text-sm text-cream/60">
        This site opens in a new tab — live embedding is blocked by its security settings.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-full bg-lemon px-5 py-2 text-sm font-semibold text-navy"
        >
          Open Live Site ↗
        </a>
        <Link
          to={`/mockup?inspiration=${encodeURIComponent(project.title)}`}
          className="focus-ring rounded-full border border-electric px-5 py-2 text-sm font-semibold text-electric-soft hover:bg-electric/10"
        >
          Use This as Inspiration
        </Link>
      </div>
    </div>
  );
}
