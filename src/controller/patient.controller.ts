import { Request, Response } from 'express';
import { Patient } from '../interface/patient';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/patients.query';
import { Code } from '../enum/code.enum';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/status.enum';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { OkPacket } from 'mysql2';
import { PatientValidationSchema } from '../validators/patient.validator';
import * as yup from 'yup';


type ResultSet = [
  RowDataPacket[] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader,
  FieldPacket[]
];

export const getPatients = async (
  req: Request,
  res: Response
): Promise<Response<Patient[]>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENTS);
    const patientsData = result[0] as Array<Patient>;
    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          'Patients retrieved',
          patientsData
        )
      );
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'An error occurred'
        )
      );
  }
};

export const getPatient = async (
  req: Request,
  res: Response
): Promise<Response<Patient[]>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [
      req.params.patientId,
    ]);
    const patientsData = result[0] as Array<Patient>;
    if ((result[0] as Array<ResultSet>).length > 0) {
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            'Patients retrieved',
            patientsData[0]
          )
        );
    } else {
      return res
        .status(Code.BAD_REQUEST)
        .send(
          new HttpResponse(
            Code.BAD_REQUEST,
            Status.BAD_REQUEST,
            'Patient not found'
          )
        );
    }
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'An error occurred'
        )
      );
  }
};

export const createPatient = async (
  req: Request,
  res: Response
): Promise<Response<Patient>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  try {
    const patientValidation = await PatientValidationSchema.validate(req.body, { abortEarly: false });
    let patient: Patient = { ...req.body };


    const pool = await connection();
    const result: ResultSet = await pool.query(
      QUERY.CREATE_PATIENTS,
      Object.values(patient)
    );
    patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body };

    return res
      .status(Code.CREATED)
      .send(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          'Patients created',
          patient
        )
      );
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof yup.ValidationError) {
      console.log(error);
      return res.status(Code.BAD_REQUEST)
        .send(
          new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, error.errors.join(',')
          )
        );
    }
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'An error occurred'
        )
      );
  }
};

export const updatePatient = async (
  req: Request,
  res: Response
): Promise<Response<Patient>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  let patient: Patient = { ...req.body };
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [
      req.params.patientId,
    ]);

    if ((result[0] as Array<ResultSet>).length > 0) {
      const result: ResultSet = await pool.query(QUERY.UPDATE_PATIENTS, [
        ...Object.values(patient),
        req.params.patientId,
      ]);
      return res.status(Code.OK).send(
        new HttpResponse(Code.OK, Status.OK, 'Patients updated', {
          ...patient,
          id: req.params.patientid,
        })
      );
    } else {
      return res
        .status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Patient not found'));
    }
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'An error occurred'
        )
      );
  }
};

export const deletePatient = async (
  req: Request,
  res: Response
): Promise<Response<Patient[]>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.DELETE_PATIENTS, [
      req.params.patientId,
    ]);
    const patientsData = result[0] as Array<Patient>;
    if ((result[0] as Array<ResultSet>).length > 0) {
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            'Patients retrieved',
            patientsData[0]
          )
        );
    } else {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            'Patient not found'
          )
        );
    }
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'An error occurred'
        )
      );
  }
};
