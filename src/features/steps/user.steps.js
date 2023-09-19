"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const axios_1 = __importDefault(require("axios"));
const chai_1 = require("chai");
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
let user;
(0, cucumber_1.Given)('un id, se validara si existe en la base de datos el usuario', () => {
    // Write code here that turns the phrase above into concrete actions
});
(0, cucumber_1.When)('enviamos un id {string} de usuario, para buscar el usuario', (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUkVYIiwiaWQiOjEsImlhdCI6MTY5NTE2NjUwNH0.TXlvCLNikLkR7U6JnvEWdB5NnRinFMUCuzdvfm3HvVE',
            'Content-Type': 'application/json', // Ejemplo de encabezado de tipo de contenido
        };
        // Write code here that turns the phrase above into concrete actions
        const resp = yield axios_1.default.get(`http://localhost:3000/users/${id}`, {
            headers,
        });
        user = resp.data.data;
    }
    catch (error) {
        // data = error.response.data;
    }
}));
(0, cucumber_1.Then)('hay informacion', () => {
    chai_1.assert.isNotEmpty(user);
});
