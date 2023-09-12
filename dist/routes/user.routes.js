"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const validate_token_1 = require("../middleware/validate-token");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.route('/login').post(user_controller_1.loginUser);
exports.userRoutes.route('/').post(user_controller_1.createUser).get(user_controller_1.getUsers);
exports.userRoutes
    .route('/:UserId')
    .get([validate_token_1.verifyToken], user_controller_1.getUser)
    .put([validate_token_1.verifyToken], user_controller_1.updateUser)
    .delete([validate_token_1.verifyToken], user_controller_1.deleteUser);
