import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateBody = (schema: Joi.Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  schema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => next(err));
};
