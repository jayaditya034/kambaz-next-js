// next.config.js (or next.config.mjs if you renamed it)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.staradvertiser.com",
      },
    ],
  },
  /* keep other config options here if you add more later */
};

export default nextConfig;
