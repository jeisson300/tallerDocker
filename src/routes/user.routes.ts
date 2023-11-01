import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from '../controller/user.controller';
import { verifyToken } from '../middleware/validate-token';

export const userRoutes = Router();

userRoutes.route('/login').post(loginUser);
userRoutes.route('/').post(createUser).get(getUsers);
userRoutes
  .route('/:UserId')
  .get([verifyToken], getUser)
  .put([verifyToken], updateUser)
  .delete([verifyToken], deleteUser);
