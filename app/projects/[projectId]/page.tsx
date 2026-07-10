import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Code, KeyRound, Store } from "lucide-react";

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
  "global-gradient-code": {
    name: "Global Gradient Code — Food Price Forecasting",
    tagline: "XGBoost-based ML system predicting monthly food prices in Sultan Kudarat",
    description:
      "My undergraduate thesis project — a machine learning forecasting system that predicts next-month prices for 19 basic commodities (rice, fish, pork, vegetables) in Sultan Kudarat, Philippines. Combines XGBoost regression with hybrid correction, using satellite-derived climate data (CHIRPS rainfall, MODIS NDVI) and engineered price features. Built during my thesis research under faculty supervision, evaluated via rolling-origin backtesting against a naive baseline.",
    tags: ["Python", "XGBoost", "FastAPI", "React", "TypeScript", "Machine Learning"],
    timeline: "Feb – Mar 2026",
    role: "Thesis Author / Fullstack Developer",
    status: "Thesis Defense",
    live: null,
    github: "https://github.com/Rappykyun/global_gradient_code",
    demo: null,
    features: [
      {
        title: "ML Forecasting Engine",
        points: [
          "XGBoost regression with 15 engineered features (momentum, volatility, mean reversion)",
          "Hybrid correction formula with 0.1 shrinkage factor for conservative predictions",
          "Rolling-origin backtesting evaluation against naive baseline",
          "Covers 19 commodities across 784 monthly observations (May 2020 – Dec 2025)",
        ],
      },
      {
        title: "Climate Data Integration",
        points: [
          "Satellite rainfall data from CHIRPS dataset",
          "Vegetation index (NDVI) from MODIS satellite imagery",
          "Climate anomaly and change detection features",
          "Cyclical encoding for seasonal patterns",
        ],
      },
      {
        title: "Fullstack Dashboard",
        points: [
          "React + TypeScript frontend with chart visualizations",
          "FastAPI backend with Python ML inference",
          "Historical price charts and forecast comparisons",
          "Commodity-wise prediction breakdowns",
        ],
      },
    ],
    tech: [
      { label: "ML Framework", value: "XGBoost / Python" },
      { label: "Backend", value: "FastAPI" },
      { label: "Frontend", value: "React + TypeScript" },
      { label: "Data Sources", value: "CHIRPS, MODIS, DA Market Price Survey" },
      { label: "Evaluation", value: "Rolling-Origin Backtesting" },
      { label: "Deployment", value: "Local / VPS" },
    ],
  },
  farmstock: {
    name: "Farmstock — Agricultural Inventory & Order System",
    tagline: "Laravel + React inventory management platform for agricultural products",
    description:
      "A freelance capstone project — fullstack inventory and order management system for agricultural businesses. Handles product cataloguing, stock tracking, order requests with multi-item support, status workflows, and activity logging. Built with Laravel 13, React, Inertia.js, and MySQL, featuring role-based permissions, audit trails, and PDF report generation for orders and inventory logs.",
    tags: ["Laravel", "React", "Inertia.js", "MySQL", "Tailwind CSS", "PHP"],
    timeline: "Apr – May 2026",
    role: "Fullstack Developer (Freelance)",
    status: "Deployed",
    live: "https://farmstock.ralphvincent.tech",
    github: "https://github.com/Rappykyun/farmstock",
    demo: {
      email: "admin@farmstock.test",
      password: "password",
    },
    features: [
      {
        title: "Inventory Management",
        points: [
          "Product catalog with categories, units, and multi-image support",
          "Real-time stock level tracking and low-stock alerts",
          "Inventory logging with reason tracking",
          "Bulk operations and CSV import/export",
        ],
      },
      {
        title: "Order Processing",
        points: [
          "Multi-item order requests with quantity management",
          "Status workflow: pending → approved → fulfilled → cancelled",
          "PDF generation for order confirmations",
          "Order history and search filtering",
        ],
      },
      {
        title: "Access Control & Audit",
        points: [
          "Role-based permissions (admin, staff, viewer)",
          "Activity logging via Spatie ActivityLog",
          "User management with granular access control",
          "Secure authentication with Laravel Fortify",
        ],
      },
    ],
    tech: [
      { label: "Backend", value: "Laravel 13" },
      { label: "Frontend", value: "React + Inertia.js" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Database", value: "MySQL" },
      { label: "Permissions", value: "Spatie Laravel Permission" },
      { label: "PDF", value: "DomPDF" },
      { label: "Deployment", value: "VPS / Nginx" },
    ],
  },
  tritrack: {
    name: "TriTrack — Tricycle Booking & Dispatch Platform",
    tagline: "Real-time tricycle booking system with driver app, passenger app, and admin web dashboard",
    description:
      "A freelance capstone project — a complete ride-hailing platform for tricycle operators. Includes a Next.js web dashboard for admins, and two Expo React Native mobile apps (driver and passenger). Features real-time ride requests, driver approval workflows, trip tracking with map integration, fare calculation, and role-based authentication. Built with Supabase for backend, Expo Location for GPS tracking, and push notifications for ride updates.",
    tags: ["Next.js", "React Native", "Expo", "Supabase", "TypeScript", "Maps"],
    timeline: "Apr 2026",
    role: "Fullstack Developer (Freelance)",
    status: "Demo",
    live: "https://tritrack.ralphvincent.tech",
    github: "https://github.com/Rappykyun/web",
    demo: {
      email: "admin@tritrack.test",
      password: "password",
    },
    features: [
      {
        title: "Admin Web Dashboard",
        points: [
          "Real-time trip monitoring with status filters",
          "Driver management with approval workflows",
          "Passenger and trip history views",
          "Stats cards: total trips, active drivers, revenue",
        ],
      },
      {
        title: "Driver Mobile App",
        points: [
          "Trip acceptance and rejection workflows",
          "GPS location tracking with MapLibre integration",
          "Fare calculation based on distance/route area",
          "Push notifications for new ride requests",
        ],
      },
      {
        title: "Passenger Mobile App",
        points: [
          "Ride request with pickup/destination input",
          "Real-time driver matching and ETA",
          "Trip history and fare receipts",
          "In-app notifications for trip status updates",
        ],
      },
    ],
    tech: [
      { label: "Web Frontend", value: "Next.js 16 + TypeScript" },
      { label: "Mobile Apps", value: "Expo SDK 54 + React Native" },
      { label: "Backend", value: "Supabase (PostgreSQL, Auth, Realtime)" },
      { label: "Maps", value: "MapLibre React Native + Leaflet" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Notifications", value: "Expo Notifications" },
      { label: "Deployment", value: "Vercel (Web) / EAS Build (Mobile)" },
    ],
  },
  "access-guard": {
    name: "Access Guard — IoT Access Control System",
    tagline: "ESP32-based smart lock with keypad, RFID, GSM, and SD card user management",
    description:
      "A freelance capstone project — an embedded IoT access control system built on ESP32. Supports multi-factor authentication via 4x4 keypad (PIN/OTP), RFID cards, and GSM SMS commands. Features servo motor locking with auto-relock, emergency override switch, LCD status display, SD card user database, and RTC timestamp logging. Designed for small offices, storage rooms, and restricted areas requiring offline-capable access control.",
    tags: ["ESP32", "C++", "PlatformIO", "IoT", "Embedded Systems", "GSM"],
    timeline: "Jun 2026",
    role: "Embedded Systems Developer (Freelance)",
    status: "Prototype",
    live: null,
    github: "https://github.com/Rappykyun/access_guard",
    demo: null,
    features: [
      {
        title: "Multi-Factor Authentication",
        points: [
          "4x4 matrix keypad with PIN and OTP entry modes",
          "RFID card reader support (MFRC522)",
          "GSM A7670E module for SMS-based OTP and remote unlock",
          "User roles: admin, staff, guest with different access levels",
        ],
      },
      {
        title: "Locking Mechanism",
        points: [
          "Servo motor lock with 0° (locked) / 90° (unlocked) positions",
          "Auto-relock after 10 seconds",
          "Emergency physical override switch",
          "Reed switch for door-open detection",
        ],
      },
      {
        title: "User Management & Logging",
        points: [
          "SD card CSV database: id, name, role, PIN, phone, enabled",
          "RTC timestamp logging for all access attempts",
          "LCD 20x4 display for status messages and prompts",
          "Buzzer and LED indicators for access feedback",
        ],
      },
    ],
    tech: [
      { label: "Microcontroller", value: "ESP32 (Arduino Framework)" },
      { label: "IDE", value: "PlatformIO" },
      { label: "Language", value: "C++" },
      { label: "Communication", value: "GSM A7670E (SMS)" },
      { label: "Peripherals", value: "LCD I2C, Keypad, RFID, Servo, SD, RTC" },
      { label: "Power", value: "5V DC + Backup Battery" },
    ],
  },
  saripos: {
    name: "SariPOS — Offline-First Sari-Sari Store POS",
    tagline: "Lightweight POS for sari-sari stores with inventory, utang, and e-load tracking",
    description:
      "SariPOS is a lightweight, offline-first point-of-sale app for sari-sari stores and small retail shops. It helps store owners record sales, manage inventory, track utang (credit), record e-load sales, and review daily or range-based reports entirely in the browser using IndexedDB. Built with Next.js 16 and Dexie for local storage, it features PIN-protected access, pack-and-piece pricing, low-stock alerts, PWA support, and manual JSON backup/restore for data portability.",
    tags: ["Next.js", "React", "TypeScript", "Dexie", "IndexedDB", "Tailwind CSS"],
    timeline: "Jul 2026",
    role: "Fullstack Developer",
    status: "Deployed",
    live: "https://saripos.sitebox.tech",
    github: "https://github.com/Rappykyun/saripos",
    demo: null,
    features: [
      {
        title: "Sales & Checkout",
        points: [
          "Cash and utang checkout with product sales",
          "E-load sales with mobile number, network, and reference tracking",
          "Pack and piece pricing support",
          "Sale history with search, date filters, pagination, and void/refund actions",
        ],
      },
      {
        title: "Inventory Management",
        points: [
          "Product catalog with categories, units, cost/sell pricing",
          "Real-time stock deduction on sale",
          "Low-stock level indicators and alerts",
          "Stock movement tracking and product seeding",
        ],
      },
      {
        title: "Utang & Reports",
        points: [
          "Customer utang tracking with balances and payment history",
          "Dashboard focused on today's store activity",
          "Reports for today, yesterday, last 7 days, this month, and custom ranges",
          "Manual JSON backup and restore for data portability",
        ],
      },
    ],
    tech: [
      { label: "Framework", value: "Next.js 16" },
      { label: "Language", value: "TypeScript" },
      { label: "UI Library", value: "React 19 + Tailwind CSS v4" },
      { label: "Storage", value: "Dexie (IndexedDB)" },
      { label: "Charts", value: "Recharts" },
      { label: "Testing", value: "Vitest + Playwright" },
      { label: "Deployment", value: "VPS / Nginx / PM2" },
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
