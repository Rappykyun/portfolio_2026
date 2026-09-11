import Link from "next/link";
import { Github, Linkedin, Facebook, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socials = [
    {
      name: "GitHub",
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
    <footer className="mt-auto border-t border-zinc-200/80 bg-surface/40 transition-colors dark:border-zinc-800/80 dark:bg-surface/40">
      <div className="site-container py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-md space-y-2">
            <p className="font-display text-base font-medium text-foreground">
              Ralph Vincent Rodriguez
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Available for freelance engineering, fullstack application development, and technical
              consulting.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-signal hover:underline"
              >
                Start an inquiry
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200/80 text-zinc-600 transition-colors hover:border-signal/50 hover:text-signal dark:border-zinc-800/80 dark:text-zinc-400 dark:hover:border-signal/50 dark:hover:text-signal"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="font-mono text-xs text-zinc-500">
              © {currentYear} Ralph Vincent Rodriguez.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
