import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Code, KeyRound } from "lucide-react";

const sectionClass =
  "rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40";

const projects = {
  "ched-elibrary": {
    name: "CHED E-Library System",
    tagline: "Digital library platform for CHED Regional Office XII",
    description:
      "Built during my internship at CHED Regional Office XII (Jun–Jul 2025), this is a full-stack library management and digital resource system serving higher education institutions across the SOCCSKSARGEN region. It handles document cataloguing, user authentication, role-based access, and resource browsing for staff and partner schools.",
    tags: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "MySQL"],
    timeline: "Jun – Jul 2025",
    role: "Fullstack Developer Intern",
    status: "Demo",
    live: "https://elibrary.ralphvincent.tech",
    github: null,
    demo: {
      email: "admin@example.com",
      password: "password",
    },
    features: [
      {
        title: "Resource Management",
        points: [
          "Upload and catalogue policies, publications, and academic materials",
          "Full-text search and category filtering",
          "Document preview and download",
        ],
      },
      {
        title: "Access Control",
        points: [
          "Role-based permissions for admins, staff, and public users",
          "Secure authentication with session management",
          "Restricted content for partner institutions",
        ],
      },
      {
        title: "Admin Dashboard",
        points: [
          "Manage users, documents, and categories",
          "Track resource access and download statistics",
          "Bulk upload and metadata editing",
        ],
      },
    ],
    tech: [
      { label: "Backend", value: "Laravel 11" },
      { label: "Frontend", value: "React + Inertia.js" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Database", value: "MySQL" },
      { label: "Auth", value: "Laravel Breeze" },
      { label: "File Storage", value: "Azure Blob Storage" },
      { label: "Deployment", value: "VPS / Nginx" },
    ],
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = projects[projectId as keyof typeof projects];

  if (!project) notFound();

  return (
    <main className="max-w-5xl mx-auto md:px-12 px-5 lg:mt-12 mt-8 mb-16">
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-green-600 dark:text-zinc-400 dark:hover:text-green-400 w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header card */}
        <section className={sectionClass}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-50/80 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-950/40 dark:text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {project.status}
                </span>
              </div>
              <h1 className="font-incognito text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.name}
              </h1>
              <p className="text-base text-zinc-500 dark:text-zinc-400 sm:text-lg">
                {project.tagline}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-200/70 pt-5 sm:grid-cols-3 dark:border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Timeline</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{project.timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Role</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{project.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Code className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Status</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{project.status}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className={sectionClass}>
          <h2 className="font-incognito text-xl font-bold sm:text-2xl">About</h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
        </section>

        {/* Tech stack */}
        <section className={sectionClass}>
          <h2 className="font-incognito text-xl font-bold sm:text-2xl">Tech Stack</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.tech.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30"
              >
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className={sectionClass}>
          <h2 className="font-incognito text-xl font-bold sm:text-2xl">Features</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30"
              >
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{feature.title}</h3>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Demo credentials */}
        {project.demo && (
          <section className={sectionClass}>
            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="h-4 w-4 text-green-600 dark:text-green-400" />
              <h2 className="font-incognito text-xl font-bold sm:text-2xl">Try it out</h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Use these credentials to log in and explore the admin dashboard.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Email</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200 select-all">
                  {project.demo.email}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Password</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200 select-all">
                  {project.demo.password}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
              Source code is private — built for a government office during internship.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
