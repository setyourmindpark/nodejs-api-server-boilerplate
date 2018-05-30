const path = require('path');
const webpack = require('webpack');
const prodEnv = require('./env.config.prod');

module.exports = {
    entry: path.resolve(__dirname, '../bin/server.js'),
    target: "node",
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'prod.bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.js$/ }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            reqlib: "require('app-root-path').require",
            config: JSON.stringify(prodEnv),
        })
    ],
};