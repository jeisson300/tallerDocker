"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.data = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
        },
        first_name: {
            type: 'string',
        },
        last_name: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        id_role: {
            type: 'integer',
        },
        status: {
            type: 'integer',
        },
    },
    required: [
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'id_role',
        'status',
    ],
};
