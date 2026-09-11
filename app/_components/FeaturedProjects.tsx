import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/projects";
import FadeContent from "./FadeContent/FadeContent";

export function FeaturedProjects() {
  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Projects
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Web, mobile, and data projects built for real users.
          </p>
          <Link
            href="/projects"
            className="focus-ring mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-signal hover:underline"
          >
            View all projects ({featuredProjects.length + 2})
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FadeContent key={project.slug} delay={index * 120} duration={600} threshold={0.15}>
              <Link
                href={`/projects/${project.slug}`}
                className="focus-ring group flex h-full flex-col justify-between rounded-2xl border border-zinc-800 bg-surface p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-md"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-signal">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-foreground group-hover:text-signal transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-2 font-mono text-xs text-zinc-400">
                    Role: {project.role}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-800/60 pt-4">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs font-medium text-foreground group-hover:text-signal">
                    <span>View project</span>
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
