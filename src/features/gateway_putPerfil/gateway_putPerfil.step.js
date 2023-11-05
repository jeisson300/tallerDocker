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
const resp_gup_1 = require("../json-schema/resp_gup");
dotenv_1.default.config();
const ajv = new ajv_1.default();
let data;
let status;
(0, cucumber_1.Given)('se creara un json con todos los datos correspondientes para actualizar', function () {
    // Write code here that turns the phrase above into concrete actions  
});
(0, cucumber_1.When)('redireccion la peticon a la api de perfiles', () => __awaiter(void 0, void 0, void 0, function* () {
    // Write code here that turns the phrase above into concrete actions
    try {
        const resp = yield axios_1.default.put(`http://localhost:8087/actualizarPerfil`, {
            id: 1,
            first_name: "hola",
            last_name: "mundo",
            nickname: "hm",
            public_info: 1,
            postal_address: "630001",
            biography: "hola mundo",
            company: "hola mundo",
            country: "hola mundo",
            links: "hola mundo"
        });
        data = resp.data;
    }
    catch (error) {
        console.log(error);
    }
}));
(0, cucumber_1.Then)('devuelve un mensaje exitoso', function () {
    // Write code here that turns the phrase above into concrete actions
    let validate = ajv.compile(resp_gup_1.schemaRespUp);
    // Validar la respuesta con el JSON Schema
    let isValid = validate(data);
    console.log(isValid);
    console.log(data);
    chai_1.assert.isTrue(isValid);
});
