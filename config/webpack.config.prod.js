const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const prodEnv = require('./env.config.prod');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../bin/server.js'),
    target: 'node',
    stats: {
        warnings: false
    },
    externals: {
        'pg-hstore': 'pg-hstore',
        'tedious': 'tedious',
        'pg': 'pg',
        'sqlite3': 'sqlite3'
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
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new UglifyJsPlugin({        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    //             uglifyOptions: {
    //                 //.. if you want custom
    //             }
    //         })
    //     ]
    // },
    // devtool: '',            
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            },
        ],

    },
    plugins: [
        new webpack.DefinePlugin({
            buildEnv: JSON.stringify(prodEnv),
        })
    ],
};