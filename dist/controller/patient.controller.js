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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getPatient = exports.getPatients = void 0;
const mysql_config_1 = require("../config/mysql.config");
const patients_query_1 = require("../query/patients.query");
const code_enum_1 = require("../enum/code.enum");
const response_1 = require("../domain/response");
const status_enum_1 = require("../enum/status.enum");
const patient_validator_1 = require("../validators/patient.validator");
const yup = __importStar(require("yup"));
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patients_query_1.QUERY.SELECT_PATIENTS);
        const patientsData = result[0];
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Patients retrieved', patientsData));
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.getPatients = getPatients;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patients_query_1.QUERY.SELECT_PATIENT, [
            req.params.patientId,
        ]);
        const patientsData = result[0];
        if (result[0].length > 0) {
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Patients retrieved', patientsData[0]));
        }
        else {
            return res
                .status(code_enum_1.Code.BAD_REQUEST)
                .send(new response_1.HttpResponse(code_enum_1.Code.BAD_REQUEST, status_enum_1.Status.BAD_REQUEST, 'Patient not found'));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.getPatient = getPatient;
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const patientValidation = yield patient_validator_1.PatientValidationSchema.validate(req.body, { abortEarly: false });
        let patient = Object.assign({}, req.body);
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patients_query_1.QUERY.CREATE_PATIENTS, Object.values(patient));
        patient = Object.assign({ id: result[0].insertId }, req.body);
        return res
            .status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Patients created', patient));
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
exports.createPatient = createPatient;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let patient = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patients_query_1.QUERY.SELECT_PATIENT, [
            req.params.patientId,
        ]);
        if (result[0].length > 0) {
            const result = yield pool.query(patients_query_1.QUERY.UPDATE_PATIENTS, [
                ...Object.values(patient),
                req.params.patientId,
            ]);
            return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Patients updated', Object.assign(Object.assign({}, patient), { id: req.params.patientid })));
        }
        else {
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Patient not found'));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(patients_query_1.QUERY.DELETE_PATIENTS, [
            req.params.patientId,
        ]);
        const patientsData = result[0];
        if (result[0].length > 0) {
            return res
                .status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Patients retrieved', patientsData[0]));
        }
        else {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Patient not found'));
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
});
exports.deletePatient = deletePatient;
