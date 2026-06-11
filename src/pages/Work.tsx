import { useState } from "react";
import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import ProjectPreviewCard from "../components/portfolio/ProjectPreviewCard";
import CTASection from "../components/ui/CTASection";
import { projectCategories, projects } from "../data/projects";

export default function Work() {
  usePageMeta(
    "Our Work",
    "Browse live previews of websites built by LemonMade Designs — business sites, nonprofits, food brands, portfolios, and custom builds."
  );
  const [category, setCategory] = useState<string>("All");
  const filtered = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Our work"
          title="Pick a Style. We Make It Real."
          subtitle="Live previews of real projects. Toggle device sizes, explore, and request one like it."
        />
        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap justify-center gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                category === c
                  ? "border-lemon bg-lemon text-navy"
                  : "border-white/15 text-cream/70 hover:border-lemon/50 hover:text-cream"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="mb-8 text-center text-sm text-cream/50">
          Some live previews may open in a new tab if the website blocks embedded previews.
        </p>
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-cream/60">No projects in this category yet — check back soon!</p>
        ) : (
          <div className="grid gap-7 lg:grid-cols-2">
            {filtered.map((p, i) => (
              <ProjectPreviewCard key={p.title} project={p} index={i} />
            ))}
          </div>
        )}
      </section>
      <CTASection
        title="Want a site like one of these?"
        subtitle="Tell us which project caught your eye — we'll build something fresh in that direction, custom for your brand."
      />
    </>
  );
}
