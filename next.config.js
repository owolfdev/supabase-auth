/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bnjiafgkkggnrizljoso.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
  },
};
