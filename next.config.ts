import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  /* config options here */
=======
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
};

export default nextConfig;
