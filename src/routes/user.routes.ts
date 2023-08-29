import { Router } from 'express';
import {
  createUser,
  loginUser
} from '../controller/user.controller';

export const userRoutes = Router();

userRoutes.route('/').post(createUser);
userRoutes.route('/login').post(loginUser);

