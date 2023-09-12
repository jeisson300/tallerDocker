"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
var Code;
(function (Code) {
    Code[Code["OK"] = 200] = "OK";
    Code[Code["NOT_FOUND"] = 404] = "NOT_FOUND";
    Code[Code["NOT_AUTHORIZED"] = 401] = "NOT_AUTHORIZED";
    Code[Code["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    Code[Code["CREATED"] = 201] = "CREATED";
    Code[Code["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(Code || (exports.Code = Code = {}));
