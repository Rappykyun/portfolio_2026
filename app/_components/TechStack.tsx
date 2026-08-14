import Image from "next/image";
import {
  siClaudecode,
  siExpress,
  siGit,
  siLaravel,
  siLinux,
  siMysql,
  siNestjs,
  siNextdotjs,
  siPi,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import VscodeIcon from "./icons/techIcons/VscodeIcon";

type TechIcon =
  | { kind: "brand"; icon: SimpleIcon; monochrome?: boolean }
  | { kind: "component"; Icon: React.ComponentType }
  | { kind: "image"; src: string };

type TechItem = TechIcon & {
  name: string;
};

type TechCategory = {
  id: string;
  title: string;
  items: TechItem[];
};

const categories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "React", kind: "brand", icon: siReact },
      { name: "Next.js", kind: "brand", icon: siNextdotjs, monochrome: true },
      { name: "Tailwind CSS", kind: "brand", icon: siTailwindcss },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "Laravel", kind: "brand", icon: siLaravel },
      { name: "NestJS", kind: "brand", icon: siNestjs },
      { name: "Express", kind: "brand", icon: siExpress, monochrome: true },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    items: [{ name: "TypeScript", kind: "brand", icon: siTypescript }],
  },
  {
    id: "data",
    title: "Data",
    items: [
      { name: "PostgreSQL", kind: "brand", icon: siPostgresql },
      { name: "MySQL", kind: "brand", icon: siMysql },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    items: [
      { name: "AWS EC2", kind: "image", src: "/tech/aws-ec2.png" },
      { name: "Linux", kind: "brand", icon: siLinux },
    ],
  },
  {
    id: "tools-ai",
    title: "Tools & AI",
    items: [
      { name: "VS Code", kind: "component", Icon: VscodeIcon },
      { name: "Git", kind: "brand", icon: siGit },
      { name: "Codex", kind: "component", Icon: CodexIcon },
      { name: "Claude Code", kind: "brand", icon: siClaudecode },
      { name: "Pi", kind: "brand", icon: siPi, monochrome: true },
    ],
  },
];

function CodexIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#10A37F" aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.705 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function TechnologyIcon({ item }: { item: TechItem }) {
  if (item.kind === "image") {
    return <Image src={item.src} alt="" width={24} height={24} className="size-6 object-contain" />;
  }

  if (item.kind === "component") {
    return (
      <span className="flex size-6 items-center justify-center [&>svg]:size-6">
        <item.Icon />
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`size-6 ${item.monochrome ? "text-zinc-900 dark:text-white" : ""}`}
      style={item.monochrome ? undefined : { color: `#${item.icon.hex}` }}
    >
      <path fill="currentColor" d={item.icon.path} />
    </svg>
  );
}

type TechStackProps = {
  compact?: boolean;
};

export default function TechStack({ compact = false }: TechStackProps) {
  return (
    <div className={`flex flex-col gap-4 sm:gap-5 ${compact ? "mt-0" : "mt-8 sm:mt-10"}`}>
      <h2 className="font-incognito text-xl font-bold text-balance sm:text-2xl lg:text-3xl">
        Tech Stack
      </h2>
      <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
        {categories.map(({ id, title, items }) => (
          <section
            key={id}
            className="grid gap-2.5 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5"
            aria-labelledby={`tech-${id}`}
          >
            <h3
              id={`tech-${id}`}
              className="pt-2 font-incognito text-sm font-semibold text-zinc-600 dark:text-zinc-400"
            >
              {title}
            </h3>
            <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4" aria-labelledby={`tech-${id}`}>
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex min-w-0 items-center gap-2.5 rounded-lg px-2 py-2 text-zinc-800 transition-colors hover:bg-zinc-100/80 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
                >
                  <span aria-hidden="true" className="shrink-0">
                    <TechnologyIcon item={item} />
                  </span>
                  <span className="truncate font-incognito text-sm font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
