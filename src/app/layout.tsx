import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProtectionProvider from "@/components/ui/ProtectionProvider";
import FloatingCTA from "@/components/home/FloatingCTA";
import PageTransition from "@/components/ui/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenkai Media — Creative Growth Agency, Ahmedabad",
  description:
    "Zenkai Media is a creative growth agency based in Ahmedabad, India. Brand identity, video, web development, and performance marketing.",
};

// Site-wide typeface (display, body, labels — see the type scale in
// globals.css). Only the weights the scale uses: 400 body, 500 medium
// (editorial / nav / buttons), 600 headings — `font-bold` maps to 600.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${inter.variable}`}>
      <body>
        {/* Runs before paint to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('zk-theme')==='dark')document.documentElement.classList.remove('light')}catch(e){}`,
          }}
        />
        <ProtectionProvider />
        <PageTransition />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
