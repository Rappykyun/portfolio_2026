export type ProjectCategory = "Web" | "Mobile" | "Data/ML" | "IoT";

export type ProjectSlug =
  | "ched-elibrary"
  | "global-gradient-code"
  | "farmstock"
  | "tritrack"
  | "access-guard";

export type ProjectFeature = {
  title: string;
  points: readonly string[];
};

export type Project = {
  slug: ProjectSlug;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  tags: readonly string[];
  timeline: string;
  role: string;
  status: string;
  live: string | null;
  github: string | null;
  demo: { email: string; password: string } | null;
  features: readonly ProjectFeature[];
  tech: readonly { label: string; value: string }[];
};

export const chedELibrary: Project = {
  slug: "ched-elibrary",
  name: "CHED E-Library System",
  tagline: "Digital library platform for CHED Regional Office XII",
  summary:
    "Digital library platform for CHED Regional Office XII serving higher education institutions across SOCCSKSARGEN.",
  description:
    "Built during my internship at CHED Regional Office XII (Jun–Jul 2025), this is a full-stack library management and digital resource system serving higher education institutions across the SOCCSKSARGEN region. It handles document cataloguing, user authentication, role-based access, and resource browsing for staff and partner schools.",
  category: "Web",
  featured: true,
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
};

export const globalGradientCode: Project = {
  slug: "global-gradient-code",
  name: "Global Gradient Code — Food Price Forecasting",
  tagline: "XGBoost-based ML system predicting monthly food prices in Sultan Kudarat",
  summary:
    "XGBoost-based ML system predicting monthly food prices for 19 commodities in Sultan Kudarat using satellite climate data.",
  description:
    "My undergraduate thesis project — a machine learning forecasting system that predicts next-month prices for 19 basic commodities (rice, fish, pork, vegetables) in Sultan Kudarat, Philippines. Combines XGBoost regression with hybrid correction, using satellite-derived climate data (CHIRPS rainfall, MODIS NDVI) and engineered price features. Built during my thesis research under faculty supervision, evaluated via rolling-origin backtesting against a naive baseline.",
  category: "Data/ML",
  featured: true,
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
};

export const farmstock: Project = {
  slug: "farmstock",
  name: "Farmstock — Agricultural Inventory & Order System",
  tagline: "Laravel + React inventory management platform for agricultural products",
  summary:
    "Fullstack inventory and order management platform for agricultural businesses with role-based access and PDF reporting.",
  description:
    "A freelance capstone project — fullstack inventory and order management system for agricultural businesses. Handles product cataloguing, stock tracking, order requests with multi-item support, status workflows, and activity logging. Built with Laravel 13, React, Inertia.js, and MySQL, featuring role-based permissions, audit trails, and PDF report generation for orders and inventory logs.",
  category: "Web",
  featured: false,
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
};

export const tritrack: Project = {
  slug: "tritrack",
  name: "TriTrack — Tricycle Booking & Dispatch Platform",
  tagline: "Real-time tricycle booking system with driver app, passenger app, and admin web dashboard",
  summary:
    "Real-time tricycle ride-hailing platform with driver and passenger mobile apps plus an admin web dashboard.",
  description:
    "A freelance capstone project — a complete ride-hailing platform for tricycle operators. Includes a Next.js web dashboard for admins, and two Expo React Native mobile apps (driver and passenger). Features real-time ride requests, driver approval workflows, trip tracking with map integration, fare calculation, and role-based authentication. Built with Supabase for backend, Expo Location for GPS tracking, and push notifications for ride updates.",
  category: "Mobile",
  featured: true,
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
};

export const accessGuard: Project = {
  slug: "access-guard",
  name: "Access Guard — IoT Access Control System",
  tagline: "ESP32-based smart lock with keypad, RFID, GSM, and SD card user management",
  summary:
    "ESP32-based smart lock with keypad, RFID, GSM SMS, and SD card user management for restricted-area access control.",
  description:
    "A freelance capstone project — an embedded IoT access control system built on ESP32. Supports multi-factor authentication via 4x4 keypad (PIN/OTP), RFID cards, and GSM SMS commands. Features servo motor locking with auto-relock, emergency override switch, LCD status display, SD card user database, and RTC timestamp logging. Designed for small offices, storage rooms, and restricted areas requiring offline-capable access control.",
  category: "IoT",
  featured: false,
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
};

export const projects: readonly Project[] = [
  chedELibrary,
  globalGradientCode,
  farmstock,
  tritrack,
  accessGuard,
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectParams = projects.map(({ slug }) => ({ projectId: slug }));
