import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import SiteEffects from "./_components/SiteEffects";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ralph Vincent Rodriguez — Full-stack Developer",
  description:
    "Portfolio of Ralph Vincent Rodriguez, a full-stack developer who builds web, mobile, data, and IoT projects.",
  keywords: [
    "Ralph Vincent Rodriguez",
    "Full-stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Machine Learning",
    "IoT",
    "Sultan Kudarat State University",
    "Philippines",
  ],
  authors: [{ name: "Ralph Vincent Rodriguez" }],
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Ralph Vincent Rodriguez — Full-stack Developer",
    description:
      "Full-stack developer building web, mobile, data, and IoT projects.",
    type: "website",
    url: siteUrl,
    siteName: "Ralph Vincent Rodriguez Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Ralph Vincent Rodriguez — Full-stack Developer",
    description:
      "Full-stack developer building web, mobile, data, and IoT projects.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ralph Vincent Rodriguez",
  jobTitle: "Full-stack Developer",
  description:
    "Full-stack developer building web, mobile, data, and IoT projects.",
  url: siteUrl,
  email: "ralphvincentrodriguez@sksu.edu.ph",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sultan Kudarat",
    addressCountry: "Philippines",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Sultan Kudarat State University",
  },
  sameAs: [
    "https://github.com/Rappykyun",
    "https://www.linkedin.com/in/ralph-vincent-rodriguez-205a6b241/",
    "https://web.facebook.com/ralphvincent.rodriguez.9",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${mono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <meta name="theme-color" content="#16a34a" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <link rel="mask-icon" href="/favicon.svg" color="#16a34a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="overflow-x-hidden bg-background text-foreground antialiased selection:bg-signal/20 selection:text-signal">
        <SiteEffects />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
