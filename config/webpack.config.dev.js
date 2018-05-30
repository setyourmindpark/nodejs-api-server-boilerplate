const path = require('path');
const webpack = require('webpack');
const devEnv = require('./env.config.dev');

module.exports = {
    entry: path.resolve(__dirname, '../bin/server.js'),
    target: "node",
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'dev.bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/ }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     }
        // }), 
        new webpack.DefinePlugin({
            reqlib: "require('app-root-path').require",
            config: JSON.stringify(devEnv),
        })
    ],
};