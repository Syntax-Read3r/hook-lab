import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd && { output: "export" }),
  basePath: "",
  ...(isProd && { trailingSlash: true }),
  images: {
    unoptimized: isProd,
  },
};

export default nextConfig;
