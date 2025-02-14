/**
 * This file must be a CommonJS module per Next.js requirements.
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {}
  }
}

export default config
