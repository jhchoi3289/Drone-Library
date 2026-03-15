import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (cover images)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // YouTube thumbnails
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      // Vimeo thumbnails via vumbnail proxy
      {
        protocol: "https",
        hostname: "vumbnail.com",
      },
      // Add other image hosts here as needed
    ],
  },
};

export default nextConfig;
