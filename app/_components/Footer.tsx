import { Github, Linkedin, Facebook, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
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
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              © {currentYear} Ralph Vincent Rodriguez. All rights reserved.
            </p>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm">
              Built with Next.js + TypeScript + Tailwind
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-green-500 dark:text-zinc-400 dark:hover:text-green-400 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
