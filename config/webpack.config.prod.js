const path = require('path');
const webpack = require('webpack');
const prodEnv = require('./env.config.prod');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '../bin/server.js'),
    target: "node",
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
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ],
        loaders: [
        ]
    },
    plugins: [
        //new UglifyJSPlugin(),  
        new webpack.DefinePlugin({
            config: JSON.stringify(prodEnv),
        })
    ],
};