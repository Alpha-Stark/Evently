/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

//** Must restart the server/application after making modification in here.
