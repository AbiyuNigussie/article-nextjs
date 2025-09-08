import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    domains: ['your-wordpress-site.com'], // <-- replace with your WP domain
  },
};

export default nextConfig;
