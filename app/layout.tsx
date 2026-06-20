import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import ClickSpark from "./_components/ClickSpark";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title:
    "Ralph Vincent Rodriguez - Computer Science Student & Aspiring Software Engineer",
  description:
    "Computer Science student at Sultan Kudarat State University, passionate about software development, web development, and creating innovative solutions. Based in Philippines.",
  keywords: [
    "Ralph Vincent Rodriguez",
    "Computer Science Student",
    "Software Developer",
    "Web Developer",
    "React",
    "TypeScript",
    "JavaScript",
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
    title:
      "Ralph Vincent Rodriguez - Computer Science Student & Software Engineer",
    description:
      "Computer Science student passionate about software development and creating innovative solutions. Explore my projects and get in touch!",
    type: "website",
    url: "https://your-domain.com",
    siteName: "Ralph Vincent Rodriguez Portfolio",
    images: [{ url: "/og-image.png", alt: "Ralph Vincent Rodriguez Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ralph Vincent Rodriguez - Computer Science Student & Software Engineer",
    description:
      "Computer Science student passionate about software development and creating innovative solutions.",
    images: ["/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ralph Vincent Rodriguez",
  jobTitle: "Computer Science Student",
  description:
    "Computer Science student at Sultan Kudarat State University, aspiring software engineer",
  url: "https://your-domain.com",
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

// Set the theme class before paint to avoid a flash and SSR/localStorage mismatch.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <link rel="mask-icon" href="/favicon.svg" color="#059669" />
        <link
          rel="preload"
          href="/fonts/incognito_regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/incognito_bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ClickSpark sparkColor="#22c55e" sparkSize={19} sparkRadius={50}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ClickSpark>
      </body>
    </html>
  );
}
