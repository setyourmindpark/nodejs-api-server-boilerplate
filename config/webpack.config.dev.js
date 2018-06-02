const path = require('path');
const webpack = require('webpack');
const devEnv = require('./env.config.dev');
const MinifyPlugin = require('babel-minify-webpack-plugin');

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
        filename: 'dev.bundle.js'
    },
    resolve: {
        alias: { '@root': path.resolve(__dirname, '../') },
        extensions: ['.js']
    },
    // devtool: '',    
    // optimization: {
    //     minimizer: [            
    //     ],
    // },
    module: {
        rules: [                     
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ],                
    },    
    plugins: [          
        new MinifyPlugin(),
        new webpack.DefinePlugin({
            config: JSON.stringify(devEnv),            
        })
    ],
};