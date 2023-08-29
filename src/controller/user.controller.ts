import { Request, Response } from 'express';
import { User } from '../interface/user';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/users.query';
import { Code } from '../enum/code.enum';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/status.enum';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { OkPacket } from 'mysql2';
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


type ResultSet = [
  RowDataPacket[] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader,
  FieldPacket[]
];


export const createUser = async (
  req: Request,
  res: Response
): Promise<Response<User>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  let user: User = { ...req.body };
  try {
    const pool = await connection();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result: ResultSet = await pool.query(
      QUERY.CREATE_USER,
      Object.values(user)
    );
    user = { id: (result[0] as ResultSetHeader).insertId, ...req.body };


    return res
      .status(Code.CREATED)
      .send(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          'Patients created',
          user
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


export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response<User>> => {
  // validaciones


  const pool = await connection();
  const result: ResultSet = await pool.query(
    QUERY.USER_BY_EMAIL,
    [req.body.email]
  );

  const usersData = result[0] as Array<User>;

  if ((result[0] as Array<ResultSet>).length == 0) return res.status(400).json({ error: 'contraseña no válida' })
  let user: User = usersData[0];


  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
  // create token
  const token = jwt.sign({
    name: user.first_name,
    id: user.id
  }, "secreto")

  return res.header('auth-token', token).json({
    error: null,
    data: { token }
  })
}
