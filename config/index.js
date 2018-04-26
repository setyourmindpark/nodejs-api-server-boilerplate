
const rootPath = require('app-root-path');

require('dotenv').config();

const env = process.env.ENV || 'dev';

let envPath = rootPath.path ;

if (env === 'prod') envPath += '/env/prod.env';
else envPath += '/env/dev.env';

require('dotenv').config({ path: envPath });

const config = require('./env');

config.env = env;
module.exports = config;
