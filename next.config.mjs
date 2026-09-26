/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // www → apex, so there is one canonical host (Vercel can also do this
      // in Domains; this keeps it correct either way).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zenkaimedia.in" }],
        destination: "https://zenkaimedia.in/:path*",
        permanent: true,
      },
      // Pages from the previous static site, so existing links and Google
      // rankings carry over to the new URLs.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/testimonials.html", destination: "/", permanent: true },
      { source: "/manifest.json", destination: "/manifest.webmanifest", permanent: true },
      { source: "/Assets/Logo/:file", destination: "/:file", permanent: true },
    ];
  },
};

export default nextConfig;
