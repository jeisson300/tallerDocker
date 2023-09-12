"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRoutes = void 0;
const express_1 = require("express");
const patient_controller_1 = require("../controller/patient.controller");
const validate_token_1 = require("../middleware/validate-token");
exports.patientRoutes = (0, express_1.Router)();
exports.patientRoutes.route('/').get(patient_controller_1.getPatients).post(patient_controller_1.createPatient);
exports.patientRoutes
    .route('/:patientId')
    .get([validate_token_1.verifyToken], patient_controller_1.getPatient)
    .put(patient_controller_1.updatePatient)
    .delete(patient_controller_1.deletePatient);
