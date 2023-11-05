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
const dotenv_1 = __importDefault(require("dotenv"));
const resp_gc_1 = require("../json-schema/resp_gc");
dotenv_1.default.config();
const ajv = new ajv_1.default();
let data;
let status;
(0, cucumber_1.Given)('Mensaje de creacion de la api de seguridad y del perfil', function () {
    // Write code here that turns the phrase above into concrete actions
    // return 'pending';
});
(0, cucumber_1.When)('redireccion de peticion a la api de seguridad y perfil', () => __awaiter(void 0, void 0, void 0, function* () {
    // Write code here that turns the phrase above into concrete actions
    try {
        const resp = yield axios_1.default.post(`http://localhost:8087/crearUsuario`, {
            first_name: "Nepheli",
            last_name: "Loux",
            email: "nl@hotmail.com",
            password: "123",
            id_role: 10,
            status: "1"
        });
        data = resp.data;
        // console.log(data)
    }
    catch (error) {
        console.log(error);
    }
}));
(0, cucumber_1.Then)('devuelve un mensaje exitoso de ambas apis', () => __awaiter(void 0, void 0, void 0, function* () {
    let validate = ajv.compile(resp_gc_1.schemaRespCreate);
    // Validar la respuesta con el JSON Schema
    let isValid = validate(data);
    chai_1.assert.isTrue(isValid);
}));
