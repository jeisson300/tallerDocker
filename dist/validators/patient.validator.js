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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientValidationSchema = void 0;
const yup = __importStar(require("yup"));
exports.PatientValidationSchema = yup.object({
    first_name: yup.string().trim().required('el campo first_name es requerido'),
    last_name: yup.string().trim().required('el campo last_name es requerido'),
    email: yup.string().email('debe ingresar un email válido').required('el campo "email" es requerido'),
    address: yup.string().trim().required('el campo address es requerido'),
    phone: yup.string().trim().required('el campo phone es requerido').length(9, 'El campo phone es demaciado largo'),
    status: yup.number().default(() => 1),
});
