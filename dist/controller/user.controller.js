"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const mysql_config_1 = require("../config/mysql.config");
const users_query_1 = require("../query/users.query");
const code_enum_1 = require("../enum/code.enum");
const response_1 = require("../domain/response");
const status_enum_1 = require("../enum/status.enum");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_validator_1 = require("../validators/user.validator");
const yup = __importStar(require("yup"));
const login_validator_1 = require("../validators/login.validator");
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let user = Object.assign({}, req.body);
    try {
        const userValidation = yield user_validator_1.UserValidationSchema.validate(req.body, { abortEarly: false });
        const pool = yield (0, mysql_config_1.connection)();
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(user.password, salt);
        const result = yield pool.query(users_query_1.QUERY.CREATE_USER, Object.values(user));
        user = Object.assign({ id: result[0].insertId }, req.body);
        return res
            .status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Users created', user));
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log(error);
            return res.status(code_enum_1.Code.BAD_REQUEST)
                .send(new response_1.HttpResponse(code_enum_1.Code.BAD_REQUEST, status_enum_1.Status.BAD_REQUEST, error.errors.join(',')));
        }
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validaciones
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(users_query_1.QUERY.USER_BY_EMAIL, [
        req.body.email,
    ]);
    const usersData = result[0];
    try {
        const loginValidation = yield login_validator_1.LoginValidationSchema.validate(req.body, { abortEarly: false });
        if (result[0].length == 0)
            return res.status(400).json({ error: 'Email o contraseña inválida' });
        let user = usersData[0];
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json({ error: 'Email o contraseña inválida' });
        // create token
        const token = jsonwebtoken_1.default.sign({
            name: user.first_name,
            id: user.id,
        }, 'secreto');
        return res.header('auth-token', token).json({
            error: null,
            data: { token },
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(code_enum_1.Code.BAD_REQUEST).json({
                error: error.errors.join(',')
            });
        }
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR).json({
            error: status_enum_1.Status.INTERNAL_SERVER_ERROR
        });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(users_query_1.QUERY.SELECT_USERS);
        console.log(result);
        const UsersData = result[0];
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Users retrieved', UsersData));
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(users_query_1.QUERY.SELECT_USER, [
            req.params.UserId,
        ]);
        const UsersData = result[0];
        if (result[0].length > 0) {
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Users retrieved', UsersData[0]));
        }
        else {
            return res
                .status(code_enum_1.Code.BAD_REQUEST)
                .send(new response_1.HttpResponse(code_enum_1.Code.BAD_REQUEST, status_enum_1.Status.BAD_REQUEST, 'User not found'));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    // const {id} = req.body.user;
    const { id } = req.body.user;
    let User = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(users_query_1.QUERY.SELECT_USER, [
            req.params.UserId,
        ]);
        const data = result[0];
        if (result[0].length == 0) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'User not found'));
        }
        const { id: ID } = data[0];
        const userValidation = yield user_validator_1.UserValidationSchema.validate(req.body, { abortEarly: false });
        if (id === ID) {
            const salt = yield bcrypt_1.default.genSalt(10);
            User.password = yield bcrypt_1.default.hash(User.password, salt);
            if (result[0].length > 0) {
                const result = yield pool.query(users_query_1.QUERY.UPDATE_USERS, [
                    ...Object.values(User),
                    req.params.UserId,
                ]);
                return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Users updated', Object.assign(Object.assign({}, User), { id: req.params.Userid })));
            }
            else {
                return res
                    .status(code_enum_1.Code.NOT_FOUND)
                    .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'User not found'));
            }
        }
        else {
            throw new Error('NO ESTA AUTORIZADO, TOKEN INVALIDO');
        }
    }
    catch (error) {
        console.error(error);
        if (error instanceof yup.ValidationError) {
            console.log(error);
            return res.status(code_enum_1.Code.BAD_REQUEST)
                .send(new response_1.HttpResponse(code_enum_1.Code.BAD_REQUEST, status_enum_1.Status.BAD_REQUEST, error.errors.join(',')));
        }
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        var result = yield pool.query(users_query_1.QUERY.SELECT_USER, [
            req.params.UserId,
        ]);
        const data = result[0];
        if (result[0].length == 0) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'User not found'));
        }
        yield pool.query(users_query_1.QUERY.DELETE_USERS, [
            req.params.UserId,
        ]);
        if (result[0].length > 0) {
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Users deleted'));
        }
        else {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'User not found'));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.deleteUser = deleteUser;
