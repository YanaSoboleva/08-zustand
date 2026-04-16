import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

async redirects() {
    return [
      {
        source: '/notes',
        destination: '/notes/filter/all',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
