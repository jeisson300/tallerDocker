export const schemaCorrectLogin = {
    type: 'object',
    properties: {
        error: {
            type: 'null',
        },
        data: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                },
            },
            required: ['token'],
        },
    },
    required: ['error', 'data'],
};