import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  // The API route spawns the Lighthouse CLI as a child process; it must never
  // be pulled into the server bundle.
  serverExternalPackages: ["lighthouse"],
  experimental: {
    // Ship only the icon/chart symbols that are actually imported.
    optimizePackageImports: ["chart.js", "react-chartjs-2"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
