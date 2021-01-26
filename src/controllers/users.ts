import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { errResponseHandler, responseHandler } from "../helpers";
import { UserModel } from "../models";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allUsers = await UserModel.find({});
  return responseHandler(res, 200, {
    users: allUsers,
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, avatar } = req.body as {
    avatar: string;
    email: string;
    password: string;
  };
  const findUser = await UserModel.findOne({ email });
  if (findUser)
    return errResponseHandler(res, next, 409, "Email has been taken");
  req.body.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  if (!avatar) delete req.body.avatar;
  const createdUser = await UserModel.create(req.body);
  return responseHandler(res, 201, {
    user: createdUser,
  });
};

const findUser = async (res: Response, next: NextFunction, id: string) => {
  const user = await UserModel.findById(id);
  if (!user) return errResponseHandler(res, next, 404, "User not found!");
  return user;
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const user = await findUser(res, next, id);
  return responseHandler(res, 200, {
    user: user,
  });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const existingUser = await findUser(res, next, id);
  existingUser.set(req.body);
  await existingUser.save();
  return responseHandler(res, 200, {
    user: existingUser,
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const existingUser = await findUser(res, next, id);
  await existingUser.delete();
  return responseHandler(res, 200, {
    user: existingUser,
  });
};
