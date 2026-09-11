import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/projects";
import FadeContent from "./FadeContent/FadeContent";

export function FeaturedProjects() {
  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Verified case studies and deliverables
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              Real projects spanning public-sector platforms, machine learning research, and
              realtime mobile dispatch systems.
            </p>
          </div>
          <Link
            href="/projects"
            className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-signal hover:underline"
          >
            All projects ({featuredProjects.length + 2})
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FadeContent key={project.slug} delay={index * 120} duration={600} threshold={0.15}>
              <Link
                href={`/projects/${project.slug}`}
                className="focus-ring group flex h-full flex-col justify-between rounded-2xl border border-zinc-200/80 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-md dark:border-zinc-800/80 dark:bg-surface"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-signal">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-foreground group-hover:text-signal transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-xs font-mono text-zinc-500">
                    Role: {project.role}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono font-medium text-foreground group-hover:text-signal">
                    <span>Read case study</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
