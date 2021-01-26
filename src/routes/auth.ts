import express from "express";
import { AuthController } from "../controllers";
import { AuthValidator, catchAsyncHandler } from "../helpers";
import { validateBody } from "../middlewares";

const authRoutes = express.Router();
authRoutes
  .route("/")
  .post(
    validateBody(AuthValidator.loginValidationObject),
    catchAsyncHandler(AuthController.login)
  );
authRoutes
  .route("/token")
  .post(
    validateBody(AuthValidator.tokenLoginValidationObject),
    catchAsyncHandler(AuthController.tokenLogin)
  );
authRoutes
  .route("/register")
  .post(
    validateBody(AuthValidator.registerValidationObject),
    catchAsyncHandler(AuthController.register)
  );

export default authRoutes;
