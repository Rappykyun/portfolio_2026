import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

const sectionClass =
  "rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40";

const projects = [
  {
    icon: BookOpen,
    name: "CHED E-Library System",
    description:
      "Digital library platform for CHED Regional Office XII serving higher education institutions across SOCCSKSARGEN.",
    slug: "ched-elibrary",
    tags: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "MySQL"],
    live: "https://elibrary.ralphvincent.tech",
  },
];

export default function Projects() {
  return (
    <main className="max-w-5xl mx-auto md:px-12 px-5 lg:mt-12 mt-8">
      <div className="flex flex-col gap-5 sm:gap-6">
        <section className={sectionClass}>
          <h1 className="font-incognito text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Projects
          </h1>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Things I&apos;ve built as a graduating CS student and freelance developer.
          </p>
        </section>

        <section className={sectionClass}>
          <p className="text-xl sm:text-2xl font-bold pb-4 font-incognito">
            All Projects
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-zinc-200/70 bg-white/60 p-4 transition-all duration-200 hover:border-green-500/40 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/30 dark:hover:border-green-500/30"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-zinc-200/70 bg-zinc-100/80 p-2.5 dark:border-zinc-700/60 dark:bg-zinc-800/60">
                    <project.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-incognito text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {project.name}
                      </h2>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500" />
                    </div>
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/70 bg-zinc-100/80 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
