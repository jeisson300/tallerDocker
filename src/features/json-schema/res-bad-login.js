"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaBadLogin = void 0;
exports.schemaBadLogin = {
    type: 'object',
    properties: {
        error: {
            type: 'string'
        }
    },
    required: ['error']
};
