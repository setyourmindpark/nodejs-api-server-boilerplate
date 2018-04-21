
const paths = {
    '/api/sample/select1/{param1}': {
        get: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/param1' }],
            responses: {
                200: {
                    description: 'select1',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/select2/{param1}/{param2}': {
        get: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/param1' }, { $ref: '#/parameters/param2' }],
            responses: {
                200: {
                    description: 'select1',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/insert': {
        post: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/insert' }],
            responses: {
                200: {
                    description: 'insert',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/update/{where}': {
        put: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/where' }, { $ref: '#/parameters/update' }],
            responses: {
                200: {
                    description: 'update',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/remove/{where}': {
        delete: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/where' }],
            responses: {
                200: {
                    description: 'remove',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },


    '/api/sample/getPI/{where}/{pageNo}': {
        get: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/where' }, { $ref: '#/parameters/pageNo' }],
            responses: {
                200: {
                    description: 'getPI',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/getPR/{where}/{pageNo}': {
        get: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/where' }, { $ref: '#/parameters/pageNo' }],
            responses: {
                200: {
                    description: 'getPI',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/getPIWithPR/{where}/{pageNo}': {
        get: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/where' }, { $ref: '#/parameters/pageNo' }],
            responses: {
                200: {
                    description: 'getPI',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/transaction': {
        post: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }],
            responses: {
                200: {
                    description: 'transaction',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    // '/api/sample/sendMail':{
    //   post: {
    //     tags: ['SAMPLE SEND MAIL API'],
    //     summary: 'RESTFUL FORMAT',
    //     operationId: 'jaehunpark',
    //     produces: ['application/json'],
    //     parameters: [{$ref: '#/parameters/token'},{$ref: '#/parameters/sendMail'}],
    //     responses: {
    //         200: {
    //             description: 'transaction',
    //             schema: {"$ref": "#/definitions/definition"}
    //         }
    //     }
    //   }
    // },

    '/api/sample/checkEmail': {
        post: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/token' }, { $ref: '#/parameters/checkEmail' }],
            responses: {
                200: {
                    description: 'checkEmail',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

}

const parameters = {
    token: {
        name: 'accesstoken',
        in: 'header',
        required: true,
        type: 'string',
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIzOTQzNjYzfQ.a6K3QxTVsArCFcpzeSUiLAL02YY5VAzenijxlJXv7Xs'
    },

    param1: {
        name: 'param1',
        in: 'path',
        required: true,
        type: 'string'
    },
    param2: {
        name: 'param2',
        in: 'path',
        required: true,
        type: 'string'
    },
    where: {
        name: 'where',
        in: 'path',
        default: 'a',
        required: true,
        type: 'string'
    },
    pageNo: {
        name: 'pageNo',
        in: 'path',
        default: '1',
        required: true,
        type: 'integer'
    },

    insert: {
        name: 'insert',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                param1: { type: 'string', default: 'value1' },
                param2: { type: 'string', default: 'value2' },
                param3: { type: 'string', default: 'value3' }
            }
        }
    },

    update: {
        name: 'update',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                param1: { type: 'string', default: 'value1' },
                param2: { type: 'string', default: 'value2' },
                param3: { type: 'string', default: 'value3' }
            }
        }
    },

    remove: {
        name: 'remove',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                param1: { type: 'string', default: 'value1' },
                param2: { type: 'string', default: 'value2' }
            }
        }
    },

    sendMail: {
        name: 'remove',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                to: { type: 'string', default: 'jhpark1481@gmail.com' },
                subject: { type: 'string', default: '제목' },
                text: { type: 'string', default: '내용' }
            }
        }
    },

    checkEmail: {
        name: 'remove',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', default: 'jhpark1481@gmail.com' }
            }
        }
    },

}

const definitions = {
    definition: {
        name: 'definition',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                resultCode: {
                    default: '0001'
                },
                body: {
                    default: {
                        code: '001',
                        msg: 'some message',
                        data: 'some data'
                    }
                }
            }
        }
    },

}

module.exports = {    
    paths: paths,
    parameters: parameters,
    definitions: definitions
};
