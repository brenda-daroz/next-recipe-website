// /** @type {import('next').NextConfig} */
// const nextConfig = {}

const pathPrefix = process.env.NODE_ENV === 'production'
  ? 'https://brenda-daroz.github.io/next-recipe-website'
  : '';

module.exports = {
  env: {
    pathPrefix,
    assetPrefix: './'
  },
};
