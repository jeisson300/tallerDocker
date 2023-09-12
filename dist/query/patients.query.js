"use strict";
// export const QUERY = {
//   SELECT_PATIENTS: 'CALL patientsSelProc();',
//   SELECT_PATIENT: 'CALL patientsSelOneProc(?);',
//   CREATE_PATIENTS: 'CALL patientsInsProc (?,?,?,?,?,?);',
//   UPDATE_PATIENTS: 'CALL patientsUpProc (?,?,?,?,?,?,?);',
//   DELETE_PATIENTS: 'CALL patientsDelProc (?);',
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM patients LIMIT 50',
    SELECT_PATIENT: 'SELECT * FROM patients WHERE id = ?',
    CREATE_PATIENTS: 'INSERT INTO patients(firts_name, last_name, email, address, phone, status) VALUES (?, ?, ?, ?, ?, ?);',
    UPDATE_PATIENTS: 'UPDATE patients SET firts_name = ?, last_name = ?, email = ?, address = ?,  phone = ?, status = ? WHERE id = ?',
    DELETE_PATIENTS: 'DELETE FROM patients WHERE id = ?',
};
