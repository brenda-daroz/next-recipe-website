/** @type {import('next').NextConfig} */

const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/next-recipe-website'
  : '';

  const nextConfig = {
    basePath: pathPrefix,
   output: "export",
   distDir: 'dist',
   images: {
     unoptimazed: true,
   },

  }

module.exports = nextConfig
