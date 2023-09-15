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
const resp_search_1 = require("../json-schema/resp-search");
const ajv = new ajv_1.default();
let data = '';
(0, cucumber_1.Given)('un email, se buscara un email, si existe en la base de datos', () => {
    // Write code here that turns the phrase above into concrete actions
    data = '';
});
(0, cucumber_1.When)('se ingresa el usuario {string} y la contraseña {string}', (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Write code here that turns the phrase above into concrete actions
        const resp = yield axios_1.default.post('http://localhost:3000/users/login', {
            email,
            password,
        });
        data = resp.data;
    }
    catch (error) {
        data = error.response.data;
    }
}));
(0, cucumber_1.Then)('el esquema es valido', () => {
    // Write code here that turns the phrase above into concrete actions
    const validate = ajv.compile(resp_search_1.schemaSearch);
    // Validar la respuesta con el JSON Schema
    const isValid = validate(data);
    chai_1.assert.isTrue(isValid);
});
