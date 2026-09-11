import Link from "next/link";
import {
  Globe,
  Smartphone,
  BrainCircuit,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { projects, type ProjectCategory } from "@/lib/projects";
import FadeContent from "@/app/_components/FadeContent/FadeContent";
import InquiryBanner from "@/app/_components/InquiryBanner";

function getCategoryIcon(category: ProjectCategory) {
  switch (category) {
    case "Web":
      return Globe;
    case "Mobile":
      return Smartphone;
    case "Data/ML":
      return BrainCircuit;
    case "IoT":
      return Cpu;
  }
}

export default function ProjectsPage() {
  return (
    <main>
      {/* Header */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="eyebrow">Case Studies & Deliverables</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Engineered software with verified outcomes
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Explore documented systems delivered across four core technical domains: web platforms,
              mobile dispatch applications, machine learning forecasting engines, and embedded IoT
              security controls.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => {
              const Icon = getCategoryIcon(project.category);
              return (
                <FadeContent
                  key={project.slug}
                  delay={index * 80}
                  duration={500}
                  threshold={0.1}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="focus-ring group flex h-full flex-col justify-between rounded-2xl border border-zinc-200/80 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-md dark:border-zinc-800/80 dark:bg-surface"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-background text-signal dark:border-zinc-800/80">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-signal">
                            {project.category}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {project.status}
                        </span>
                      </div>

                      <h2 className="mt-4 font-display text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-signal">
                        {project.name}
                      </h2>

                      <p className="mt-1 font-mono text-xs text-zinc-500">
                        {project.role}
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
                        <span>View case study</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </FadeContent>
              );
            })}
          </div>
        </div>
      </section>

      <InquiryBanner />
    </main>
  );
}
