/** @type {import('next').NextConfig} */

const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/next-recipe-website'
  : '';

module.exports = {
  basePath: pathPrefix,
  output: "export",
  compiler: {
    styledComponents: true,
  }
}
