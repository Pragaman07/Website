import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist_Mono,
  Caveat,
  Black_Ops_One,
} from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import global from "@/content/global.json";
import { Shell } from "@/components/shell/Shell";
import { getFact, type GlobalContent } from "@/lib/content";

// Static 700/800 slices (Foundations v1 needs exactly these weights) —
// the full variable+opsz file pushed hero LCP past 3s on throttled 4G.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
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

// Geist Mono — labels, tabular data, versions (Space Mono retired,
// DECISIONS.md 3 Sep 2026; display-scale stats wear Bricolage). Not
// preloaded: never the LCP — keeps the display font first in the 4G queue.
const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

// Know Me only — never preloaded, so Work pages don't pay for it.
const doodle = Caveat({
  subsets: ["latin"],
  variable: "--font-doodle",
  display: "swap",
  preload: false,
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: global.wordmark.text,
  // Per-route descriptions are Content-Doc copy (§13) — added in that pass.
};

/**
 * No-flash mode boot (§2.1 + CLAUDE.md mode system), runs before paint:
 * 1. marks JS availability (.reveal guard),
 * 2. deep links force their mode (/work → work, /know-me → know) and persist,
 * 3. `/` with a stored mode redirects to that home — no door flash,
 * 4. otherwise data-mode = stored mode, defaulting to work,
 * 5. data-theme = the stored override ("pragaman-theme") else the OS
 *    preference — night mode (DECISIONS.md 3 Sep), stamped before paint.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");var m=null;try{m=localStorage.getItem("pragaman-mode")}catch(e){}if(m!=="work"&&m!=="know")m=null;var p=location.pathname;var f=(p==="/work"||p.indexOf("/work/")===0)?"work":((p==="/know-me"||p.indexOf("/know-me/")===0)?"know":null);if(f&&f!==m){m=f;try{localStorage.setItem("pragaman-mode",m)}catch(e){}}d.setAttribute("data-mode",m||"work");var t=null;try{t=localStorage.getItem("pragaman-theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light"}d.setAttribute("data-theme",t);if(p==="/"&&m){location.replace(m==="work"?"/work":"/know-me")}})();`;

/**
 * Footer BUILD stamp — D-3's v{age}.{month} scheme (age from facts.json,
 * month = the build month). Computed ONCE at prerender, module scope, and
 * handed down as a prop: a client-side Date would hydrate differently.
 */
const buildStamp = `v${getFact("identity.age").value}.${new Date().getMonth() + 1}`;

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
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Shell content={global as GlobalContent} buildStamp={buildStamp}>
          {children}
        </Shell>
        {/* Only on Vercel — locally the insights script 404s the console */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
