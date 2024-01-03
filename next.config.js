/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains:['firebasestorage.googleapis.com']
    },
    webpack: (config, {}) => {
      config.resolve.alias.canvas = false
      config.resolve.alias.encoding = false
      return config
    }

    
  }

module.exports = nextConfig
