import type { NextConfig } from "next";

const wp = process.env.WORDPRESS_API_URL ? new URL(process.env.WORDPRESS_API_URL) : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wp
      ? [
          {
            protocol: (wp.protocol.replace(":", "") as "http" | "https"),
            hostname: wp.hostname,
            port: wp.port || undefined,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
