import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import SiteShell from "@/app/components/SiteShell";

export const metadata: Metadata = {
  title: "StepUp for SDG — Global Education Impact Platform",
  description:
    "Uniting students, schools, NGOs and companies to advance SDG 4 — Quality Education — through transparent, measurable impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
=======
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
<<<<<<< HEAD
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
=======
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
          rel="stylesheet"
        />
        <style>{`
          .goog-te-banner-frame { display: none !important; }
          .skiptranslate { display: none !important; }
          body { top: 0 !important; position: static !important; }
          #google_translate_element { position: absolute; left: -9999px; top: -9999px; }
        `}</style>
      </head>
      <body>
        <SiteShell>{children}</SiteShell>

        <div id="google_translate_element" />

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="gt-init" strategy="afterInteractive">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              { pageLanguage: 'en', autoDisplay: false },
              'google_translate_element'
            );
          }
        `}</Script>
      </body>
    </html>
  );
}
