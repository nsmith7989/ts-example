const { IgnorePlugin } = require('webpack')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')

const nextConfig = {
  webpack: (config, { dev }) => {
    const webpackPlugins = config.plugins
    const webpackRules = config.module.rules
    const originalEntry = config.entry

    const customWebpackConfig = {
      plugins: {
        base: [
          new IgnorePlugin(/^\.\/locale$/, /moment$/),
          new Dotenv({ path: './.env', systemvars: true })
        ],
        prod: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
          })
        ]
      },
      rules: {
        base: []
      }
    }

    if (!dev) {
      webpackPlugins.push(...customWebpackConfig.plugins.prod)
    }

    webpackRules.push(...customWebpackConfig.rules.base)
    webpackPlugins.push(...customWebpackConfig.plugins.base)

    config.stats = { colors: true }

    return config
  }
}

module.exports = withPlugins([withTypescript], nextConfig)
