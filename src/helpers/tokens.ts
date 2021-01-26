import jwt from "jsonwebtoken";
import { env } from "../config";
import { UserModel } from "../models";
import { UserDocument } from "../models/user";

export interface UserPayload {
  uid: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
}

export const generateToken = (user: UserDocument) => {
  const payload: UserPayload = {
    uid: user.id,
    avatar: user.avatar,
    name: user.firstName + user.lastName,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, env.jwt.secret + user.password, {
    expiresIn: "1d",
  });
  return { token };
};

export const validateToken = async (token: string) => {
  try {
    const decodedToken: any = jwt.decode(token);
    const findUser = await UserModel.findById(decodedToken.uid);
    const isTokenVerified = jwt.verify(
      token,
      env.jwt.secret + findUser.password
    );
    if (!isTokenVerified) return null;
    const { token: generatedToken } = generateToken(findUser);
    return { token: generatedToken, user: findUser };
  } catch (err) {
    return null;
  }
};
