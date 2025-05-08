import type { NextConfig } from "next";
// import { NextResponse } from "next/server";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/real-time-performance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
