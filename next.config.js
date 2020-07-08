require('dotenv').config()
const withImages = require('next-images')
const webpack = require('webpack')

module.exports = withImages({
    distDir: 'build',
    generateBuildId: async () => {
        if (process.env.BUILD_ID) {
            return process.env.BUILD_ID
        } else {
            return `${new Date().getTime()}`
        }
    },
    webpack: (config) => {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env))
        return config
    },
})