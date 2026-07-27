import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import ProtectionProvider from "@/components/ui/ProtectionProvider";
import FloatingCTA from "@/components/home/FloatingCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenkai Media — Creative Growth Agency, Ahmedabad",
  description:
    "Zenkai Media is a creative growth agency based in Ahmedabad, India. Brand identity, video, web development, and performance marketing.",
};

// Site-wide display/heading font. Regular body/UI text intentionally uses
// no webfont at all — it's set to the native "ui-sans-serif, system-ui,
// sans-serif" stack in globals.css, so nothing needs to load for it.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dmsans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${dmSans.variable}`}>
      <body>
        {/* Runs before paint to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('zk-theme')==='dark')document.documentElement.classList.remove('light')}catch(e){}`,
          }}
        />
        <ProtectionProvider />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}