"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaCorrectLogin = void 0;
exports.schemaCorrectLogin = {
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
