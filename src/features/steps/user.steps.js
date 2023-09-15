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
const faker_1 = require("@faker-js/faker");
let email = '';
let password = '';
let _token = '';
const randomPassword = faker_1.faker.internet.password();
const randomEmail = faker_1.faker.internet.email();
(0, cucumber_1.Given)('un login', () => {
    // Write code here that turns the phrase above into concrete actions
    /*     email = 'REX@hotmail.com';
      password = '123'; */
    email = randomEmail;
    password = randomPassword;
});
(0, cucumber_1.When)('se ingresa email y password', () => __awaiter(void 0, void 0, void 0, function* () {
    // Write code here that turns the phrase above into concrete actions
    const resp = yield axios_1.default.post('http://localhost:3000/users/login', {
        email,
        password,
    });
    const { data } = resp.data;
    const { token } = data;
    _token = token;
}));
(0, cucumber_1.When)('se ingresa email {string} y password {string}', (_email, _password) => __awaiter(void 0, void 0, void 0, function* () {
    // Write code here that turns the phrase above into concrete actions
    // console.log(password);
    if (_email.length > 0) {
        email = _email;
        password = _password;
    }
    let data;
    data = yield axios_1.default
        .post('http://localhost:3000/users/login', {
        email,
        password,
    })
        .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        data = yield error.response.data;
    }));
    console.log(data);
    // console.log(data);
    // const { data } = resp.data;
    // const { token } = data;
    // _token = token;
    // console.log(token);
}));
(0, cucumber_1.Then)('devolvera un token', () => {
    // Write code here that turns the phrase above into concrete actions
    chai_1.assert.isNotEmpty(_token);
});
