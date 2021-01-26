import express from "express";
import { PetController } from "../controllers";
import { catchAsyncHandler, PetsValidator } from "../helpers";
import { validateBody } from "../middlewares";

const petsRoutes = express.Router();
petsRoutes
  .route("/")
  .get(catchAsyncHandler(PetController.getPets))
  .post(
    validateBody(PetsValidator.createPetValidationObject),
    catchAsyncHandler(PetController.createPet)
  );

petsRoutes
  .route("/:id")
  .get(catchAsyncHandler(PetController.getPet))
  .put(
    validateBody(PetsValidator.updatePetValidationObject),
    catchAsyncHandler(PetController.updatePet)
  )
  .delete(catchAsyncHandler(PetController.deletePet));

export default petsRoutes;
