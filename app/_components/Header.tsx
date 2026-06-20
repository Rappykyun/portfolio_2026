"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { House, FolderKanban, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Sync state with the class set pre-paint by the inline script in layout.tsx.
  // Intentional one-time DOM read on mount; keeps SSR markup stable (no hydration mismatch).
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isDark ? "dark" : "light");
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems = [
    { icon: House, label: "Home", to: "/" },
    { icon: FolderKanban, label: "Projects", to: "/projects" },
    { icon: Mail, label: "Contact", to: "/contact" },
  ];

  type NavItemProps = {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    to: string;
    onClick?: () => void;
  };

  function NavItem({ icon: Icon, label, to, onClick }: NavItemProps) {
    const isActive = pathname === to;
    return (
      <li className="md:w-auto w-full">
        <Link
          href={to}
          onClick={onClick}
          className={`
            w-full md:w-auto text-base md:text-sm flex items-center gap-2 font-incognito font-semibold
            transition-all duration-200 px-4 py-3 md:py-2 rounded-lg
            ${
              isActive
                ? "text-green-500 bg-green-50 dark:bg-green-950/30 scale-105"
                : "text-zinc-600 dark:text-zinc-400 hover:text-green-500 dark:hover:text-green-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }
            md:hover:scale-105 active:scale-95
          `}
        >
          <Icon className="w-5 h-5 transition-colors stroke-current" />
          <span>{label}</span>
        </Link>
      </li>
    );
  }

  return (
    <header className="bg-white/80 dark:bg-dark/80 border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 md:p-6 max-w-7xl">

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative z-50 p-3 rounded-xl transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <div className="relative w-6 h-6">
            <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}`}>
              <Menu size={24} />
            </div>
            <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
              <X size={24} />
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 justify-center md:flex" aria-label="Main navigation">
          <ul className="flex items-center justify-center gap-2">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                to={item.to}
              />
            ))}
          </ul>
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95 z-50 ml-auto md:ml-0 p-2 rounded-lg transition-all duration-200"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <div className="relative w-5 h-5">
            <div className={`absolute inset-0 transition-all duration-300 ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}>
              <SunIcon />
            </div>
            <div className={`absolute inset-0 transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
              <MoonIcon />
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden ${isOpen ? "border-t border-zinc-200 dark:border-zinc-800" : ""}`}
      >
        <nav
          id="mobile-nav"
          className={`overflow-hidden px-4 transition-[max-height,opacity] duration-300 ease-out ${
            isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!isOpen}
        >
          <ul className="flex flex-col gap-2 py-4">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                to={item.to}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
