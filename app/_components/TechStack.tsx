"use client";

import ReactIcon from "./icons/techIcons/ReactIcon";
import LaravelIcon from "./icons/techIcons/LaravelIcon";
import NextjsIcon from "./icons/techIcons/NextjsIcon";
import TailwindIcon from "./icons/techIcons/TailwindIcon";
import MysqlIcon from "./icons/techIcons/MysqlIcon";
import ExpressIcon from "./icons/techIcons/ExpressIcon";
import VscodeIcon from "./icons/techIcons/VscodeIcon";
import GitIcon from "./icons/techIcons/GitIcon";
import LogoLoop, { type LogoItem } from "./LogoLoop/LogoLoop";
import { useReducedMotion } from "./useReducedMotion";

const icons = [
  { name: "React", Icon: ReactIcon },
  { name: "Laravel", Icon: LaravelIcon },
  { name: "Next.js", Icon: NextjsIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "MySQL", Icon: MysqlIcon },
  { name: "Express", Icon: ExpressIcon },
  { name: "VS Code", Icon: VscodeIcon },
  { name: "Git", Icon: GitIcon },
];

export function TechStack() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <div className="max-w-xl">
            <p className="eyebrow">Tooling</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Core technologies and tools
            </h2>
          </div>
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Technologies list">
            {icons.map(({ name, Icon }) => (
              <li
                key={name}
                className="flex items-center gap-2.5 rounded-lg border border-zinc-200/80 bg-surface px-4 py-2.5 shadow-sm dark:border-zinc-800/80"
              >
                <div className="h-5 w-5 shrink-0 [&>svg]:h-5 [&>svg]:w-5 text-foreground">
                  <Icon />
                </div>
                <span className="font-mono text-xs font-medium text-foreground">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const logoItems: LogoItem[] = icons.map(({ name, Icon }) => ({
    title: name,
    ariaLabel: name,
    node: (
      <div className="flex items-center gap-2.5 rounded-lg border border-zinc-200/80 bg-surface px-4 py-2.5 shadow-sm transition-colors dark:border-zinc-800/80">
        <div className="h-5 w-5 shrink-0 [&>svg]:h-5 [&>svg]:w-5 text-foreground">
          <Icon />
        </div>
        <span className="font-mono text-xs font-medium text-foreground">{name}</span>
      </div>
    ),
  }));

  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="mb-8 max-w-xl">
          <p className="eyebrow">Tooling</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Core technologies and tools
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Battle-tested frameworks, languages, and tools leveraged across client and research projects.
          </p>
        </div>

        <div className="mt-6 py-4">
          <LogoLoop
            logos={logoItems}
            speed={30}
            pauseOnHover={true}
            fadeOut={true}
            scaleOnHover={false}
            logoHeight={42}
            gap={16}
            ariaLabel="Technologies marquee"
          />
        </div>
      </div>
    </section>
  );
}

export default TechStack;
