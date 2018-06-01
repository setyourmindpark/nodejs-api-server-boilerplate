const path = require('path');
const webpack = require('webpack');
const devEnv = require('./env.config.dev');
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
        filename: 'dev.bundle.js'
    },
    resolve: {
        alias: { '@root': path.resolve(__dirname, '../') },
        extensions: ['.js']
    },
    devtool: 'source-map',
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
            config: JSON.stringify(devEnv),
        })
    ],
};