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
(0, cucumber_1.Given)('ya hay varios usuarios creados, se obtendran todos', function () {
    // Write code here that turns the phrase above into concrete actions    
});
(0, cucumber_1.When)('redireccion de la peticion a la api de seguridad para obtener todos los usuarios creados', () => __awaiter(void 0, void 0, void 0, function* () {
    // Write code here that turns the phrase above into concrete actions
    try {
        const resp = yield axios_1.default.get(`http://localhost:8087/obtenerUsuarios`);
        data = resp.data;
    }
    catch (error) {
        console.log(error);
    }
}));
(0, cucumber_1.Then)('devuelve un json con todo el contenido', function () {
    // Write code here that turns the phrase above into concrete actions    
    chai_1.assert.isNotEmpty(data);
});
