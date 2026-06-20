import ReactIcon from "./icons/techIcons/ReactIcon";
import LaravelIcon from "./icons/techIcons/LaravelIcon";
import NextjsIcon from "./icons/techIcons/NextjsIcon";
import TailwindIcon from "./icons/techIcons/TailwindIcon";
import MysqlIcon from "./icons/techIcons/MysqlIcon";
import ExpressIcon from "./icons/techIcons/ExpressIcon";
import VscodeIcon from "./icons/techIcons/VscodeIcon";
import GitIcon from "./icons/techIcons/GitIcon";

type TechStackProps = {
  compact?: boolean;
};

export default function TechStack({ compact = false }: TechStackProps) {
  const icons = [
    { name: "React", Icon: ReactIcon },
    { name: "Laravel", Icon: LaravelIcon },
    { name: "Next.js", Icon: NextjsIcon },
    { name: "Tailwind", Icon: TailwindIcon },
    { name: "MySQL", Icon: MysqlIcon },
    { name: "Express", Icon: ExpressIcon },
    { name: "VS Code", Icon: VscodeIcon },
    { name: "Git", Icon: GitIcon },
  ];

  return (
    <div className={`flex flex-col gap-5 ${compact ? "mt-0" : "mt-8 sm:mt-10"}`}>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-incognito">Tech Stack</h2>
      <div className="grid grid-cols-4 gap-y-5 gap-x-4 sm:grid-cols-8 sm:gap-x-6">
        {icons.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 sm:gap-3 [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-7 sm:[&>svg]:w-7 lg:[&>svg]:h-8 lg:[&>svg]:w-8"
          >
            <Icon />
            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-incognito">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
