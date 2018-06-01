const path = require('path');
const webpack = require('webpack');
const prodEnv = require('./env.config.prod');

module.exports = {
    entry: path.resolve(__dirname, '../bin/server.js'),
    target: 'node',
    stats: {
        warnings: false
    },
    node: {
        console: false,
        global: true,
        process: false,
        __filename: true,
        __dirname: true,
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'prod.bundle.js'
    },
    resolve: {
        alias: { '@root': path.resolve(__dirname, '../') },
        extensions: ['.js']
    },
    // devtool: '',    
    optimization: {
        minimizer: [
        ],
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            config: JSON.stringify(prodEnv),
        })
    ],
};