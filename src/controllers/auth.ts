import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { errResponseHandler, generateToken, responseHandler } from "../helpers";
import { validateToken } from "../helpers/tokens";
import { UserModel } from "../models";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as { email: string; password: string };
  const findUser = await UserModel.findOne({ email });
  if (!findUser) return errResponseHandler(res, next, 401, "Wrong credentials");
  const isPassMatched = await bcrypt.compare(password, findUser.password);
  if (!isPassMatched)
    return errResponseHandler(res, next, 401, "Wrong credentials");
  const { token } = generateToken(findUser);
  delete findUser._doc.password;
  return responseHandler(res, 200, {
    token,
    user: {
      uid: findUser.id,
      avatar: findUser.avatar,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    },
  });
};

export const tokenLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body as { token: string };
  const result = await validateToken(token);
  if (!result)
    return errResponseHandler(res, next, 422, "Invalid access token");
  delete result.user._doc.password;
  return responseHandler(res, 200, {
    token: result.token,
    user: {
      uid: result.user.id,
      avatar: result.user.avatar,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    },
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  const findUser = await UserModel.findOne({ email });
  if (findUser)
    return errResponseHandler(res, next, 409, "Email has been taken");
  req.body.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  await UserModel.create(req.body);
  return responseHandler(res, 200);
};
