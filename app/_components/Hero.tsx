import Link from "next/link";
import { Github, Linkedin, Facebook, Mail, MapPin } from "lucide-react";

const portfolio_pic = "/portfolio_pic_v2.png";
const bgImage = "/bg-image.png";

export function Hero() {
  const socials = [
    {
      name: "Github",
      icon: Github,
      url: "https://github.com/Rappykyun",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/ralph-vincent-rodriguez-205a6b241/",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://web.facebook.com/ralphvincent.rodriguez.9",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:ralphvincentrodriguez@sksu.edu.ph",
    },
  ];
  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-start md:gap-7 md:text-left">
        {/* Photo + CV (left column on desktop) */}
        <div className="flex w-full max-w-37.5 shrink-0 flex-col gap-3 sm:max-w-45">
          <div className="aspect-3/4 w-full overflow-hidden rounded-2xl border border-green-500/20 bg-white/70 p-1.5 dark:border-green-500/10 dark:bg-zinc-900/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portfolio_pic}
              alt="Portrait of Ralph Vincent Rodriguez"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          <a
            href="/cv.pdf"
            download
            className="relative w-full overflow-hidden rounded-md border border-green-600/60 bg-green-600 px-4 py-2 text-center font-incognito text-white transition-colors duration-200 hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/70"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-md bg-cover bg-center opacity-40 dark:opacity-80"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-md bg-black/25 dark:bg-black/40"
            />
            <span className="relative z-10">Download CV</span>
          </a>
        </div>

        {/* Text content (right column on desktop) */}
        <div className="flex w-full min-w-0 flex-col items-center gap-3 md:items-start">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-50/80 px-3 py-1 text-xs font-incognito-condensed uppercase tracking-widest text-green-700 dark:border-green-500/20 dark:bg-green-950/40 dark:text-green-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Open to work
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <MapPin className="h-4 w-4" />
              Sultan Kudarat, PH
            </span>
          </div>

          <div>
            <h1 className="font-incognito text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ralph Vincent Rodriguez
            </h1>
            <p className="mt-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:text-base">
              Computer Science Student · Aspiring Software Engineer
            </p>
          </div>
          <p className="w-full text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Graduating Computer Science student at Sultan Kudarat State
            University and a full-stack developer. I build responsive web apps
            with React and Laravel, and I am ready to bring that to a full-time
            team.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 sm:text-base"
            >
              View Projects
              <span className="text-lg">-&gt;</span>
            </Link>
            <a
              href="mailto:ralphvincentrodriguez@sksu.edu.ph"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors duration-200 hover:border-green-500/60 hover:text-green-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:text-green-400 sm:text-base"
            >
              Send Email
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1.5 text-zinc-600 transition-colors duration-200 hover:border-green-500/60 hover:text-green-700 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:text-green-400"
              >
                <social.icon size={18} className="h-4 w-4" />
                <span className="text-xs font-medium font-incognito sm:text-sm">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
