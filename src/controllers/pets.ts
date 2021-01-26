import { NextFunction, Request, Response } from "express";
import { errResponseHandler, responseHandler } from "../helpers";
import { PetModel } from "../models";

export const getPets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allPets = await PetModel.find({}).populate("owner", "-password");
  return responseHandler(res, 200, {
    pets: allPets,
  });
};

export const createPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createdPet = await PetModel.create(req.body);
  return responseHandler(res, 201, {
    pet: createdPet,
  });
};

const findPet = async (res: Response, next: NextFunction, id: string) => {
  const pet = await PetModel.findById(id).populate("owner", "-password");
  if (!pet) return errResponseHandler(res, next, 404, "Pet not found!");
  return pet;
};

export const getPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const pet = await findPet(res, next, id);
  return responseHandler(res, 200, {
    pet: pet,
  });
};

export const updatePet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const existingPet = await findPet(res, next, id);
  existingPet.set(req.body);
  await existingPet.save();
  return responseHandler(res, 200, {
    pet: existingPet,
  });
};

export const deletePet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const existingPet = await findPet(res, next, id);
  await existingPet.delete();
  return responseHandler(res, 200, {
    pet: existingPet,
  });
};
