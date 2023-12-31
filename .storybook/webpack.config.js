const path = require('path')

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        // loader: require.resolve('ts-loader'),
        options: {
            presets: [require.resolve('babel-preset-react-app')],
            root: '../src/',
        }
    })

    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src/')]
    config.resolve.extensions.push('.ts', '.tsx')
    return config
}
