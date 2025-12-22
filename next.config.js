/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: { domains: ["res.cloudinary.com"] },
  // allowlist additional external image hosts used for debugging/mocks
  // add more domains here if you serve images from other CDNs
  images: { domains: ["res.cloudinary.com", "images.unsplash.com"] },
};

module.exports = nextConfig;
