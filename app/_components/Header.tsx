"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-surface/85 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-surface/85">
      <div className="site-container flex h-16 items-center justify-between gap-4">
        {/* Monogram Brand */}
        <Link
          href="/"
          className="focus-ring rounded font-mono text-base font-bold tracking-wider text-foreground hover:text-signal"
          aria-label="Ralph Vincent Rodriguez - Home"
        >
          RVR
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                href={item.to}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring rounded-lg px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "font-semibold text-signal"
                    : "text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: Theme toggle and mobile menu button */}
        <div className="flex items-center gap-2">
          <button
            onClick={(event) => {
              const isDark = document.documentElement.classList.toggle("dark");
              localStorage.setItem("theme", isDark ? "dark" : "light");
              event.currentTarget.setAttribute(
                "aria-label",
                `Switch to ${isDark ? "light" : "dark"} theme`,
              );
            }}
            type="button"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200/80 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
            aria-label="Toggle color theme"
          >
            <div className="relative h-5 w-5">
              <div className="absolute inset-0 hidden dark:block">
                <SunIcon />
              </div>
              <div className="absolute inset-0 dark:hidden">
                <MoonIcon />
              </div>
            </div>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200/80 text-foreground md:hidden transition-colors hover:bg-zinc-100 dark:border-zinc-800/80 dark:hover:bg-zinc-800/60"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden ${isOpen ? "border-t border-zinc-200/80 dark:border-zinc-800/80" : ""}`}
      >
        <nav
          id="mobile-nav"
          className={`site-container overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            isOpen ? "max-h-64 py-3 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!isOpen}
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`focus-ring flex h-11 items-center rounded-lg px-3 font-mono text-sm uppercase tracking-wider transition-colors ${
                      isActive
                        ? "font-semibold text-signal bg-signal/10"
                        : "text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
