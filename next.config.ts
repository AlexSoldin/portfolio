import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloudflare Workers deployment
  // This ensures the app can run in the edge runtime
};

export default nextConfig;
