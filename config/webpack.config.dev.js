const path = require('path');
const webpack = require('webpack');
const devEnv = require('./env.config.dev');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        path: path.resolve(__dirname, '../build/dev'),
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
            },
            {
                test: /\.js$/,
                include: [      // 특정디렉토리 설정
                    path.resolve(__dirname, "../node_modules/swagger-ui-express")
                ],
                loader: 'string-replace-loader',
                options: {
                    search: '__dirname',
                    replace: 'process.cwd() + "/swagger-ui"',
                    flags: 'gi'
                }
            }            
        ],                
    },    
    plugins: [          
        new MinifyPlugin(),
        new webpack.DefinePlugin({
            buildEnv: JSON.stringify(devEnv),            
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, '../node_modules/swagger-ui-express'), to: 'swagger-ui'}
        ])
    ],
};