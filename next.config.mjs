/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['stg-wparena-staging.kinsta.cloud'], // Add the external domain here
  },
};

export default nextConfig;
