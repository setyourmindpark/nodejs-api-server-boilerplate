const path = require('path');

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
        global: true,
        __filename: true,
        __dirname: true,
    },
    output: {},
    resolve: {
        alias: { '@root': path.resolve(__dirname, '../') },
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ],
    },
    plugins: [],
};