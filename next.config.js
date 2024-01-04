/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  reactStrictMode: false,
  swcMinify: true,
  env: {
    basePath: "/",
    NEXTAUTH_URL: `${process.env.NEXTAUTH_URL}`,
  },
};

module.exports = nextConfig;
