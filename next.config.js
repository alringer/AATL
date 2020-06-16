require('dotenv').config()
const withImages = require('next-images')
const webpack = require('webpack')

module.exports = withImages({
    distDir: 'build',
    webpack: (config) => {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env))
        return config
    },
})