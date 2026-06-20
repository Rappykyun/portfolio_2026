import { UserCheck, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const myProjects = [
    {
      icon: UserCheck,
      name: "FaceTrack Pro",
      description: "Smart attendance tracking powered by facial recognition",
      slug: "facetrack-pro",
    },
    {
      icon: GraduationCap,
      name: "EduHub",
      description:
        "All-in-one platform for student resources and learning materials",
      slug: "eduhub",
    },
  ];
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20 mb-20">
      <section>
        <h1 className="font-incognito text-6xl font-bold">Projects</h1>
        <p className="text-lg w-3/4 sm:text-xl text-gray-600 dark:text-gray-400 mb-8 pt-5">
          I&apos;m still a 3rd-year Computer Science student, so I only have a few
          projects under my belt so far. However, these are the ones I&apos;m most
          proud of! Some are open-source, so if one catches your eye, feel free
          to check out the code and share your ideas for improvement. 🚀
        </p>
      </section>
      <section>
        <div className="grid grid-col-2 md:grid-cols-3 gap-6">
          {myProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="flex flex-col p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                  <project.icon className="w-8 h-8 text-green-500" />
                </div>
                <div className="w-full">
                  <h2 className="font-incognito text-xl font-bold">
                    {project.name}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
