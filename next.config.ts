import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Kept intentionally thin — tokens and content are the truth, config is plumbing.
  // Pinned because a stray lockfile in the user home directory otherwise
  // makes Next.js infer the wrong workspace root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
