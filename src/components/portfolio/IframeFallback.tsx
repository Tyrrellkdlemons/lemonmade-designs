import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";

/**
 * Shown when a site blocks live embedding (X-Frame-Options / CSP frame-ancestors).
 * Displays a real screenshot of the site so the preview still shows the actual website.
 */
export default function IframeFallback({ project }: { project: Project }) {
  return (
    <div className="group/fb relative h-full min-h-[280px] overflow-hidden">
      <img
        src={project.screenshot}
        alt={`Screenshot of the ${project.title} website`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/fb:scale-[1.03]"
      />
      {/* gradient + actions overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-transparent px-4 pb-4 pt-14 text-center">
        <p className="text-xs text-cream/75">
          Live preview — this site opens in a new tab (it blocks embedding for security).
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-full bg-lemon px-5 py-2 text-sm font-bold text-navy shadow-glow"
          >
            Open Live Site ↗
          </a>
          <Link
            to={`/mockup?inspiration=${encodeURIComponent(project.title)}`}
            className="focus-ring rounded-full border border-electric bg-navy/70 px-5 py-2 text-sm font-semibold text-electric-soft backdrop-blur-sm hover:bg-electric/15"
          >
            Use This as Inspiration
          </Link>
        </div>
      </div>
    </div>
  );
}
