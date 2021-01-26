import express from "express";
import { UsersController } from "../controllers";
import { catchAsyncHandler, UsersValidator } from "../helpers";
import { validateBody } from "../middlewares";

const usersRoutes = express.Router();
usersRoutes
  .route("/")
  .get(catchAsyncHandler(UsersController.getUsers))
  .post(
    validateBody(UsersValidator.createUserValidationObject),
    catchAsyncHandler(UsersController.createUser)
  );

usersRoutes
  .route("/:id")
  .get(catchAsyncHandler(UsersController.getUser))
  .put(
    validateBody(UsersValidator.updateUserValidationObject),
    catchAsyncHandler(UsersController.updateUser)
  )
  .delete(catchAsyncHandler(UsersController.deleteUser));

export default usersRoutes;
