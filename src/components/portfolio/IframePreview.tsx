import { useEffect, useRef, useState } from "react";
import type { Project } from "../../data/projects";
import type { Device } from "./DevicePreviewToggle";
import IframeFallback from "./IframeFallback";

const deviceWidths: Record<Device, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

interface Props {
  project: Project;
  device: Device;
}

/**
 * Lazy-loaded iframe with graceful fallback.
 * - Only mounts the iframe when scrolled into view (IntersectionObserver).
 * - Projects flagged non-embeddable render the fallback immediately.
 * - If the iframe fails to fire onLoad within a timeout, fallback is shown.
 */
export default function IframePreview({ project, device }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!project.embeddable);

  useEffect(() => {
    if (failed) return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [failed]);

  useEffect(() => {
    if (!inView || loaded || failed) return;
    const t = setTimeout(() => setFailed(true), 12000);
    return () => clearTimeout(t);
  }, [inView, loaded, failed]);

  return (
    <div ref={wrapRef} className="relative h-[320px] overflow-hidden rounded-xl border border-white/10 bg-charcoal sm:h-[360px]">
      {failed ? (
        <IframeFallback project={project} />
      ) : (
        <>
          {!loaded && (
            <div className="absolute inset-0" aria-hidden="true">
              <img
                src={project.screenshot}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/30">
                <span className="animate-glow-pulse text-3xl">🍋</span>
              </div>
            </div>
          )}
          {inView && (
            <div className="flex h-full justify-center overflow-hidden">
              <iframe
                src={project.url}
                title={`Live preview of ${project.title}`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                style={{ width: deviceWidths[device], maxWidth: "100%" }}
                className="h-full border-0 transition-[width] duration-300"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
