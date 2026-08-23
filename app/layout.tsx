import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Space_Mono,
  Caveat,
  Black_Ops_One,
} from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import global from "@/content/global.json";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const doodle = Caveat({
  subsets: ["latin"],
  variable: "--font-doodle",
  display: "swap",
});

// Renders in exactly one place: the Graveyard title (Design Spec §11.2).
// Tiny subset, not preloaded — it must never cost the rest of the site.
const stencil = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stencil",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: global.wordmark.text,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-mode="work"
      suppressHydrationWarning
      className={`${display.variable} ${satoshi.variable} ${mono.variable} ${doodle.variable} ${stencil.variable}`}
    >
      <head>
        {/* Phase 1 replaces this with the full no-flash mode boot script.
            For now it only marks JS availability so .reveal never hides
            content from no-JS visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
