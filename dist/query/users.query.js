"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    CREATE_USER: 'INSERT INTO user (first_name, last_name, email, password, id_role, status) values(?,?,?,?,?,?)',
    USER_BY_EMAIL: 'SELECT * FROM user WHERE email=?',
    UPDATE_USERS: 'UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ?,  status = ? WHERE id = ?',
    DELETE_USERS: 'DELETE FROM user WHERE id = ?',
    SELECT_USER: 'SELECT * FROM user WHERE id = ?',
    SELECT_USERS: 'SELECT * FROM user LIMIT 50'
};
