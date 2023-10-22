/** @type {import('next').NextConfig} */
// const nextConfig = {}

const pathPrefix = process.env.NODE_ENV === 'production'
  ? 'http://brenda-daroz.github.io/next-recipe-website/'
  : '';

module.exports = {
  assetPrefix: pathPrefix,
  env: {
    pathPrefix,
  },
};
