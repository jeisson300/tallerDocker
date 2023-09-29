"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.data = void 0;
exports.data = {
=======
exports.schemaSearch = void 0;
exports.schemaSearch = {
>>>>>>> 5cabf80cca175c7a3ddc78f3292f903a9b911157
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
