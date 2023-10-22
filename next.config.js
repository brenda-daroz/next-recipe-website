// /** @type {import('next').NextConfig} */
// const nextConfig = {}

const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/next-recipe-website/'
  : '';

module.exports = {
  assetPrefix: pathPrefix,
  env: {
    pathPrefix,
  },
};
