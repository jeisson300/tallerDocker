export const schemaRespCreate = {
    type: 'object',
    properties: {
        resAPIAuth: {
            type: 'string',
        },
        resAPIPerfil: {
            type: 'string',
        }
    },
    required: [
        'resAPIAuth',
        'resAPIPerfil',
    ],
};
