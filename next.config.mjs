/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Photography is served from EGA's own WordPress media library.
    // Add any additional host here before referencing images from it.
    remotePatterns: [
      { protocol: 'https', hostname: 'mba.ega.edu.sg', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'ega.edu.sg', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'flagcdn.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
