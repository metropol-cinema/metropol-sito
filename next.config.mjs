/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Per usare le locandine da TMDB (campo tmdbId) con next/image, se vorrai.
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
};

export default nextConfig;
