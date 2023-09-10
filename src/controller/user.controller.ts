import { Request, Response } from 'express';
import { User } from '../interface/user';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/users.query';
import { Code } from '../enum/code.enum';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/status.enum';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { OkPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserValidationSchema } from '../validators/user.validator';
import * as yup from 'yup';
import { LoginValidationSchema } from '../validators/login.validator';

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

    const userValidation = await UserValidationSchema.validate(req.body, { abortEarly: false });

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
        new HttpResponse(Code.CREATED, Status.CREATED, 'Users created', user)
      );
  }
  catch (error: unknown) {

    if (error instanceof yup.ValidationError) {
      console.log(error);
      return res.status(Code.BAD_REQUEST)
        .send(
          new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, error.errors.join(',')
          )
        );
    }
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
  const result: ResultSet = await pool.query(QUERY.USER_BY_EMAIL, [
    req.body.email,
  ]);

  const usersData = result[0] as Array<User>;

  try {
    const loginValidation = await LoginValidationSchema.validate(req.body, { abortEarly: false });

    if ((result[0] as Array<ResultSet>).length == 0)
      return res.status(400).json({ error: 'Email o contraseña inválida' });
    let user: User = usersData[0];

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: 'Email o contraseña inválida' });
    // create token
    const token = jwt.sign(
      {
        name: user.first_name,
        id: user.id,
      },
      'secreto'
    );

    return res.header('auth-token', token).json({
      error: null,
      data: { token },
    });

  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      return res.status(Code.BAD_REQUEST).json({
        error: error.errors.join(',')
      });
    }
    return res.status(Code.INTERNAL_SERVER_ERROR).json({
      error: Status.INTERNAL_SERVER_ERROR
    });

  }



};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response<User[]>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USERS);
    console.log(result);
    const UsersData = result[0] as Array<User>;
    return res
      .status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Users retrieved', UsersData));
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

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response<User[]>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USER, [
      req.params.UserId,
    ]);
    const UsersData = result[0] as Array<User>;
    if ((result[0] as Array<ResultSet>).length > 0) {
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, 'Users retrieved', UsersData[0])
        );
    } else {
      return res
        .status(Code.BAD_REQUEST)
        .send(
          new HttpResponse(
            Code.BAD_REQUEST,
            Status.BAD_REQUEST,
            'User not found'
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

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response<User>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  // const {id} = req.body.user;

  const { id } = req.body.user;
  let User: User = { ...req.body };
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USER, [
      req.params.UserId,
    ]);
    const data = result[0] as Array<User>;

    if((result[0] as Array<ResultSet>).length == 0){
      return res
          .status(Code.NOT_FOUND)
          .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
    }
    const { id: ID } = data[0];

    const userValidation = await UserValidationSchema.validate(req.body, { abortEarly: false });


    if (id === ID) {
      const salt = await bcrypt.genSalt(10);
      User.password = await bcrypt.hash(User.password, salt);
      if ((result[0] as Array<ResultSet>).length > 0) {
        const result: ResultSet = await pool.query(QUERY.UPDATE_USERS, [
          ...Object.values(User),
          req.params.UserId,
        ]);
        return res.status(Code.OK).send(
          new HttpResponse(Code.OK, Status.OK, 'Users updated', {
            ...User,
            id: req.params.Userid,
          })
        );
      } else {
        return res
          .status(Code.NOT_FOUND)
          .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
      }
    } else {
      throw new Error('NO ESTA AUTORIZADO, TOKEN INVALIDO');
    }
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

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response<User[]>> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );
  try {
    const pool = await connection();

    var result: ResultSet = await pool.query(QUERY.SELECT_USER, [
      req.params.UserId,
    ]);
    const data = result[0] as Array<User>;

    if((result[0] as Array<ResultSet>).length == 0){
      return res
          .status(Code.NOT_FOUND)
          .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
    }


    await pool.query(QUERY.DELETE_USERS, [
      req.params.UserId,
    ]);

    if ((result[0] as Array<ResultSet>).length > 0) {
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, 'Users deleted')
        );
    } else {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found')
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