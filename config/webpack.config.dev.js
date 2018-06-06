const baseWebpack = require('./webpack.config.base');
const path = require('path');
const webpack = require('webpack');
const devEnv = require('./env.config.dev');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

baseWebpack.output = Object.assign(baseWebpack.output,{
    path: path.resolve(__dirname, '../build/dev'),
    filename: 'dev.bundle.js'
}) 

baseWebpack.module.rules = baseWebpack.module.rules.concat([
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
])

baseWebpack.plugins = baseWebpack.plugins.concat([
    new MinifyPlugin(),
    new webpack.DefinePlugin({
        buildEnv: JSON.stringify(devEnv),
    }),
    new CopyWebpackPlugin([
        { from: path.resolve(__dirname, '../node_modules/swagger-ui-express'), to: 'swagger-ui' }
    ])
])

module.exports = baseWebpack;
