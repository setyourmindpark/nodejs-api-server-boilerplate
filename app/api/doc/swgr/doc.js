const conf            = reqlib('/app/conf');
const user            = require('./user');

module.exports  = {
  "swagger": "2.0",
  "info": {
    "title": "API DOCUMENT",
    "description": "API 문서",
    "termsOfService": "",
    "contact": {
      "name": "JAEHUNPARK"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.0"
  },
  // "host": conf.proxy.host + ':' + conf.proxy.port,
  // "basePath": "/",
  // "schemes": [
  //   conf.proxy.protocol
  // ],
  "host": 'localhost:4000',
  "basePath": "/",
  "schemes": [
    'http'
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  paths: Object.assign(user.paths),
  parameters: Object.assign(user.parameters),
  definitions: Object.assign(user.definitions)
};
