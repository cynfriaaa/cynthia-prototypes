import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false
  },
  images: {
    domains: ['images.dog.ceo'],
  },
};

export default nextConfig;
