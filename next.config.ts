import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/hook-lab" : "",      // enables static HTML export
  trailingSlash: true,       // ensures all paths end with '/', required for GitHub Pages routing
  images: {
    unoptimized: true,       // disables Image Optimization (required for static export)
  },
};

export default nextConfig;
