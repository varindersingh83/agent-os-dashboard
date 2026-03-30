/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'appleid.cdn-apple.com', 'graph.facebook.com'],
  },
}

module.exports = nextConfig
