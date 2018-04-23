
const paths = {
    '/api/user/validity/email/{email}': {
        get: {
            tags: ['USER API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/email' }],
            responses: {
                200: {
                    description: 'validate email',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/user/new': {
        post: {
            tags: ['USER API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/new' }],
            responses: {
                200: {
                    description: 'new user',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/user/login': {
        post: {
            tags: ['USER API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/login' }],
            responses: {
                200: {
                    description: 'login',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/user/{id}/new/token': {
        post: {
            tags: ['USER API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/refreshtoken' }, { $ref: '#/parameters/newToken' }, { $ref: '#/parameters/id' }],
            responses: {
                200: {
                    description: 'login',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },

    '/api/user/{id}': {
        get: {
            tags: ['USER API'],
            summary: 'RESTFUL FORMAT',
            operationId: 'jaehunpark',
            produces: ['application/json'],
            parameters: [{ $ref: '#/parameters/accesstoken' }, { $ref: '#/parameters/id' }],
            responses: {
                200: {
                    description: 'get user info',
                    schema: { "$ref": "#/definitions/definition" }
                }
            }
        }
    },
}

const parameters = {
    accesstoken: {
        name: 'accesstoken',
        in: 'header',
        required: true,
        type: 'string',
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNMb2dpbmVkIjp0cnVlLCJpYXQiOjE1MjAwNjgzMzV9.KyRKCWKw_zmJc9glvBdDmrogI_wv4SiW-xpEZGSde5w'
    },

    refreshtoken: {
        name: 'refreshtoken',
        in: 'header',
        required: true,
        type: 'string',
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNMb2dpbmVkIjp0cnVlLCJpYXQiOjE1MjAwNjgzMzV9.KyRKCWKw_zmJc9glvBdDmrogI_wv4SiW-xpEZGSde5w'
    },

    newToken: {
        name: 'newToken',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                accesstoken: { type: 'string', default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNMb2dpbmVkIjp0cnVlLCJpYXQiOjE1MjAwNjgzMzV9.KyRKCWKw_zmJc9glvBdDmrogI_wv4SiW-xpEZGSde5w' }
            }
        }
    },
    email: {
        name: 'email',
        in: 'path',
        required: true,
        type: 'string'
    },

    id: {
        name: 'id',
        in: 'path',
        default: '1',
        required: true,
        type: 'integer'
    },

    login: {
        name: 'login',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', default: 'setyourmindpark@gmail.com' },
                passwd: { type: 'string', default: '4a7d1ed414474e4033ac29ccb8653d9b' }
            }
        }
    },

    new: {
        name: 'new',
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', default: '박재훈' },
                email: { type: 'string', default: 'setyourmindpark@gmail.com' },
                passwd: { type: 'string', default: '0000' }
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
