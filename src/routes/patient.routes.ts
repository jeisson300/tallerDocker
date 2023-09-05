import { Router } from 'express';
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient,
} from '../controller/patient.controller';
import { verifyToken } from '../middleware/validate-token';

export const patientRoutes = Router();

patientRoutes.route('/').get(getPatients).post(createPatient);

patientRoutes
  .route('/:patientId')
  .get([verifyToken], getPatient)
  .put(updatePatient)
  .delete(deletePatient);
