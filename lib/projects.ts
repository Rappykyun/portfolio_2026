export type ProjectIconName =
  | "book-open"
  | "brain-circuit"
  | "navigation"
  | "shield"
  | "sprout"
  | "store";

export type ProjectStatus =
  | "Internship Project"
  | "Thesis Defense"
  | "Capstone Project"
  | "Demo"
  | "Deployed"
  | "Prototype";

export interface ProjectFeature {
  title: string;
  points: readonly string[];
}

export interface ProjectTechnology {
  label: string;
  value: string;
}

export interface ProjectLinks {
  demo: string | null;
  sourceCode: string | null;
}

export interface DemoCredentials {
  email: string;
  password: string;
}

export interface ProjectCaseStudy {
  context: string;
  whatWasBuilt: string;
  demonstrates: string;
  screenshotPath: string | null;
  screenshotAlt: string;
}

export interface ProjectRecord {
  slug: string;
  name: string;
  summary: string;
  tagline: string;
  description: string;
  icon: ProjectIconName;
  tags: readonly string[];
  timeline: string;
  role: string;
  status: ProjectStatus;
  links: ProjectLinks;
  demoCredentials?: DemoCredentials;
  credentialsNote?: string;
  features: readonly ProjectFeature[];
  technology: readonly ProjectTechnology[];
  caseStudy?: ProjectCaseStudy;
}

export const projects = [
  {
    slug: "ched-elibrary",
    name: "CHED E-Library System",
    summary:
      "Digital library platform developed for CHED Regional Office XII and higher education resources across SOCCSKSARGEN.",
    tagline: "Digital library platform for CHED Regional Office XII",
    description:
      "Built during my internship at CHED Regional Office XII (Jun–Jul 2025), this full-stack library management and digital resource system was designed for higher education resources across the SOCCSKSARGEN region. It handles document cataloguing, user authentication, role-based access, and resource browsing for staff and partner schools.",
    icon: "book-open",
    tags: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "MySQL"],
    timeline: "Jun – Jul 2025",
    role: "Fullstack Developer Intern",
    status: "Internship Project",
    links: {
      demo: "https://elibrary.ralphvincent.tech",
      sourceCode: null,
    },
    demoCredentials: {
      email: "admin@example.com",
      password: "password",
    },
    credentialsNote:
      "Source code is private — built for a government office during internship.",
    caseStudy: {
      context:
        "During my internship at CHED Regional Office XII from June to July 2025, I worked on a digital library system for higher education resources in the SOCCSKSARGEN region.",
      whatWasBuilt:
        "A full-stack library management and digital resource system for cataloguing documents, authenticating users, managing role-based access, and browsing resources.",
      demonstrates:
        "End-to-end product work across Laravel, React, Inertia.js, Tailwind CSS, MySQL, and Azure Blob Storage, from resource workflows through the admin experience.",
      screenshotPath: null,
      screenshotAlt:
        "CHED E-Library resource browsing and administration interface",
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
    technology: [
      { label: "Backend", value: "Laravel 11" },
      { label: "Frontend", value: "React + Inertia.js" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Database", value: "MySQL" },
      { label: "Auth", value: "Laravel Breeze" },
      { label: "File Storage", value: "Azure Blob Storage" },
      { label: "Deployment", value: "VPS / Nginx" },
    ],
  },
  {
    slug: "global-gradient-code",
    name: "Global Gradient Code — Food Price Forecasting",
    summary:
      "XGBoost-based ML system predicting monthly food prices for 19 commodities in Sultan Kudarat using satellite climate data.",
    tagline:
      "XGBoost-based ML system predicting monthly food prices in Sultan Kudarat",
    description:
      "My undergraduate thesis project — a machine learning forecasting system that predicts next-month prices for 19 basic commodities (rice, fish, pork, vegetables) in Sultan Kudarat, Philippines. Combines XGBoost regression with hybrid correction, using satellite-derived climate data (CHIRPS rainfall, MODIS NDVI) and engineered price features. Built during my thesis research under faculty supervision, evaluated via rolling-origin backtesting against a naive baseline.",
    icon: "brain-circuit",
    tags: [
      "Python",
      "XGBoost",
      "FastAPI",
      "React",
      "TypeScript",
      "Machine Learning",
    ],
    timeline: "Feb – Mar 2026",
    role: "Thesis Author / Fullstack Developer",
    status: "Thesis Defense",
    links: {
      demo: null,
      sourceCode: "https://github.com/Rappykyun/global_gradient_code",
    },
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
    technology: [
      { label: "ML Framework", value: "XGBoost / Python" },
      { label: "Backend", value: "FastAPI" },
      { label: "Frontend", value: "React + TypeScript" },
      { label: "Data Sources", value: "CHIRPS, MODIS, DA Market Price Survey" },
      { label: "Evaluation", value: "Rolling-Origin Backtesting" },
      { label: "Deployment", value: "Local / VPS" },
    ],
  },
  {
    slug: "farmstock",
    name: "Farmstock — Agricultural Inventory & Order System",
    summary:
      "Fullstack inventory and order management platform for agricultural businesses with role-based access and PDF reporting.",
    tagline:
      "Laravel + React inventory management platform for agricultural products",
    description:
      "A freelance capstone project — fullstack inventory and order management system for agricultural businesses. Handles product cataloguing, stock tracking, order requests with multi-item support, status workflows, and activity logging. Built with Laravel 13, React, Inertia.js, and MySQL, featuring role-based permissions, audit trails, and PDF report generation for orders and inventory logs.",
    icon: "sprout",
    tags: ["Laravel", "React", "Inertia.js", "MySQL", "Tailwind CSS", "PHP"],
    timeline: "Apr – May 2026",
    role: "Fullstack Developer (Freelance)",
    status: "Deployed",
    links: {
      demo: "https://farmstock.ralphvincent.tech",
      sourceCode: "https://github.com/Rappykyun/farmstock",
    },
    demoCredentials: {
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
    technology: [
      { label: "Backend", value: "Laravel 13" },
      { label: "Frontend", value: "React + Inertia.js" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Database", value: "MySQL" },
      { label: "Permissions", value: "Spatie Laravel Permission" },
      { label: "PDF", value: "DomPDF" },
      { label: "Deployment", value: "VPS / Nginx" },
    ],
  },
  {
    slug: "tritrack",
    name: "TriTrack — Tricycle Booking & Dispatch Platform",
    summary:
      "Real-time tricycle ride-hailing platform with driver and passenger mobile apps plus an admin web dashboard.",
    tagline:
      "Real-time tricycle booking system with driver app, passenger app, and admin web dashboard",
    description:
      "A freelance capstone project — a complete ride-hailing platform for tricycle operators. Includes a Next.js web dashboard for admins, and two Expo React Native mobile apps (driver and passenger). Features real-time ride requests, driver approval workflows, trip tracking with map integration, fare calculation, and role-based authentication. Built with Supabase for backend, Expo Location for GPS tracking, and push notifications for ride updates.",
    icon: "navigation",
    tags: ["Next.js", "React Native", "Expo", "Supabase", "TypeScript", "Maps"],
    timeline: "Apr 2026",
    role: "Fullstack Developer (Freelance)",
    status: "Demo",
    links: {
      demo: "https://tritrack.ralphvincent.tech",
      sourceCode: "https://github.com/Rappykyun/web",
    },
    demoCredentials: {
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
    technology: [
      { label: "Web Frontend", value: "Next.js 16 + TypeScript" },
      { label: "Mobile Apps", value: "Expo SDK 54 + React Native" },
      { label: "Backend", value: "Supabase (PostgreSQL, Auth, Realtime)" },
      { label: "Maps", value: "MapLibre React Native + Leaflet" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Notifications", value: "Expo Notifications" },
      { label: "Deployment", value: "Vercel (Web) / EAS Build (Mobile)" },
    ],
  },
  {
    slug: "access-guard",
    name: "Access Guard — IoT Access Control System",
    summary:
      "ESP32-based smart lock with keypad, RFID, GSM SMS, and SD card user management for restricted-area access control.",
    tagline:
      "ESP32-based smart lock with keypad, RFID, GSM, and SD card user management",
    description:
      "A freelance capstone project — an embedded IoT access control system built on ESP32. Supports multi-factor authentication via 4x4 keypad (PIN/OTP), RFID cards, and GSM SMS commands. Features servo motor locking with auto-relock, emergency override switch, LCD status display, SD card user database, and RTC timestamp logging. Designed for small offices, storage rooms, and restricted areas requiring offline-capable access control.",
    icon: "shield",
    tags: ["ESP32", "C++", "PlatformIO", "IoT", "Embedded Systems", "GSM"],
    timeline: "Jun 2026",
    role: "Embedded Systems Developer (Freelance)",
    status: "Prototype",
    links: {
      demo: null,
      sourceCode: "https://github.com/Rappykyun/access_guard",
    },
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
    technology: [
      { label: "Microcontroller", value: "ESP32 (Arduino Framework)" },
      { label: "IDE", value: "PlatformIO" },
      { label: "Language", value: "C++" },
      { label: "Communication", value: "GSM A7670E (SMS)" },
      { label: "Peripherals", value: "LCD I2C, Keypad, RFID, Servo, SD, RTC" },
      { label: "Power", value: "5V DC + Backup Battery" },
    ],
  },
  {
    slug: "saripos",
    name: "SariPOS — Offline-First Sari-Sari Store POS",
    summary:
      "Lightweight, offline-first point-of-sale app for sari-sari stores with stock tracking, utang management, e-load sales, and daily reports.",
    tagline:
      "Lightweight POS for sari-sari stores with inventory, utang, and e-load tracking",
    description:
      "SariPOS is a lightweight, offline-first point-of-sale app for sari-sari stores and small retail shops. It helps store owners record sales, manage inventory, track utang (credit), record e-load sales, and review daily or range-based reports entirely in the browser using IndexedDB. Built with Next.js 16 and Dexie for local storage, it features PIN-protected access, pack-and-piece pricing, low-stock alerts, PWA support, and manual JSON backup/restore for data portability.",
    icon: "store",
    tags: ["Next.js", "React", "TypeScript", "Dexie", "IndexedDB", "Tailwind CSS"],
    timeline: "Jul 2026",
    role: "Fullstack Developer",
    status: "Deployed",
    links: {
      demo: "https://saripos.sitebox.tech",
      sourceCode: "https://github.com/Rappykyun/saripos",
    },
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
    technology: [
      { label: "Framework", value: "Next.js 16" },
      { label: "Language", value: "TypeScript" },
      { label: "UI Library", value: "React 19 + Tailwind CSS v4" },
      { label: "Storage", value: "Dexie (IndexedDB)" },
      { label: "Charts", value: "Recharts" },
      { label: "Testing", value: "Vitest + Playwright" },
      { label: "Deployment", value: "VPS / Nginx / PM2" },
    ],
  },
] satisfies readonly ProjectRecord[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
