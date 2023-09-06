import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// middleware to validate token (rutas protegidas)
export const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.header('auth-token');
  console.log('entro en el mmiddleware');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });
  try {
    const verified = jwt.verify(token, 'secreto');
    req.body.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' });
  }
};
