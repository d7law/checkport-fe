/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  reactStrictMode: false,
  swcMinify: true,
  env: {
    basePath: "",
  },
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_LINK}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
