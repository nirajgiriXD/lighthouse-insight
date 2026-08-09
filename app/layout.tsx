/**
 * External dependencies.
 */
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";

/**
 * Internal dependencies.
 */
import "../styles/globals.css";
import { ReportProvider } from "../contexts/reportContext";
import { ThemeProvider, THEME_INIT_SCRIPT } from "../contexts/themeContext";
import { getSiteUrl, siteConfig } from "../utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — Lighthouse audits and score comparison`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Lighthouse",
    "Lighthouse report",
    "web performance",
    "Core Web Vitals",
    "accessibility audit",
    "SEO audit",
    "site speed comparison",
  ],
  authors: [{ name: "Niraj Giri", url: siteConfig.repository }],
  creator: "Niraj Giri",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Lighthouse audits and score comparison`,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${siteConfig.name} — Lighthouse audits and score comparison`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafd" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1018" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        {/* Paints the stored theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <ReportProvider>{children}</ReportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
