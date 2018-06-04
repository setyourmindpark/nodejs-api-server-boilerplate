const sample = require('./sample');
const user = require('./user');

module.exports = {
    "swagger": "2.0",
    "info": {
        "title": "API DOCUMENT",
        "description": "API DOCUMENT",
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
    // "host": '',
    "basePath": "/",
    "schemes": [
        'http','https'
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    paths: Object.assign(sample.paths, user.paths),
    parameters: Object.assign(sample.parameters, user.parameters),
    definitions: Object.assign(sample.definitions, user.definitions) // https://github.com/GenFirst/swagger-to-existing-nodejs-project/blob/master/backend/swagger.json
};
