"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    console.log('entro en el mmiddleware');
    if (!token)
        return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jsonwebtoken_1.default.verify(token, 'secreto');
        req.body.user = verified;
        next(); // continuamos
    }
    catch (error) {
        res.status(400).json({ error: 'token no es válido' });
    }
};
exports.verifyToken = verifyToken;
