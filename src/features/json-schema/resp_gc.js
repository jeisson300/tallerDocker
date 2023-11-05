"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaRespCreate = void 0;
exports.schemaRespCreate = {
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
