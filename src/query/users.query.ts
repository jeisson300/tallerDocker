export const QUERY = {
    CREATE_USER: 'INSERT INTO user (first_name, last_name, email, password, id_role, status) values(?,?,?,?,?,?)',
    USER_BY_EMAIL: 'SELECT * FROM user WHERE email=?',

};