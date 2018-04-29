
const paths = {
    '/api/sample/path/{param1}': {
        get: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/param1' }],
            responses: {
                200: {
                    description: 'path',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/query': {
        get: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [
                { $ref: '#/parameters/query1' }, 
                { $ref: '#/parameters/query2' }, 
                { $ref: '#/parameters/query3' }, 
                { $ref: '#/parameters/query4' }],
            responses: {
                200: {
                    description: 'query',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/post': {
        post: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/post' }],
            responses: {
                200: {
                    description: 'post',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    // 전체 업데이트는 put, 일부분은 patch
    '/api/sample/put/{where}': {
        put: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/where' }, { $ref: '#/parameters/put' }],
            responses: {
                200: {
                    description: 'put',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/sample/delete/{where}': {
        delete: {
            tags: ['SAMPLE API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/where' }],
            responses: {
                200: {
                    description: 'delete',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },
}

const parameters = {    
    param1: {
        //default: '1',
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
    query1: {
        name: 'param1',
        in: 'query',
        required: true,
        type: 'string'
    },
    query2: {
        name: 'param2',
        in: 'query',
        required: true,
        type: 'string'
    },
    query3: {
        name: 'param3',
        in: 'query',
        required: true,
        type: 'string'
    },
    query4: {
        name: 'param4',
        in: 'query',
        required: true,
        type: 'string'
    },
    where: {
        name: 'where',
        in: 'path',        
        required: true,
        type: 'string'
    },
    post: {
        name: 'post',
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
    put: {
        name: 'put',
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
