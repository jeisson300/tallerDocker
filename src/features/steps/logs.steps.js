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
dotenv_1.default.config();
const ajv = new ajv_1.default();
let data;
let status;
(0, cucumber_1.Given)('La api cargada', () => {
    // Write code here that turns the phrase above into concrete actions
});
(0, cucumber_1.When)('se realiza la petición a la api de logs', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUkVYIiwiaWQiOjEsImlhdCI6MTY5NTE2NjUwNH0.TXlvCLNikLkR7U6JnvEWdB5NnRinFMUCuzdvfm3HvVE',
            'Content-Type': 'application/json', // Ejemplo de encabezado de tipo de contenido
        };
        // Write code here that turns the phrase above into concrete actions
        const resp = yield axios_1.default.post(`http://${process.env.LOGS_HOST}:80/logs`, {
            "FechaCreacion": (new Date()).toISOString().substring(0, 10),
            "tipolog": "INF"
        }, {
            headers,
        });
        data = resp.data.data;
        status = resp.status;
    }
    catch (error) {
        console.log(error);
    }
}));
(0, cucumber_1.Then)('devuelve el listado de los logs en json', () => {
    chai_1.assert.isNotNull(data);
});
(0, cucumber_1.Then)('el estado de la petición debe ser exitoso', () => {
    chai_1.assert.equal(status, 200);
});
// Escenario II
let newLog;
let statusCreate;
(0, cucumber_1.Given)('El mensaje {string} y el tipo {string}', (msg, type) => {
    newLog = { log: msg, tipo: type };
});
(0, cucumber_1.When)('se realiza la petición al api de logs', () => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield axios_1.default.post(`http://${process.env.LOGS_HOST}:80/createLog`, newLog);
    data = resp.data.data;
    statusCreate = resp.status;
}));
(0, cucumber_1.Then)('la respuesta de la api es exitosa', () => {
    chai_1.assert.equal(statusCreate, 200);
});
