import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// -2 is the priority for the Next.js dev server
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Required for Cloudflare Workers deployment
  // This ensures the app can run in the edge runtime
};

export default nextConfig;
