import { NextFunction, Request, Response } from "express";

export const catchAsyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((err: Error) => next(err));
};

export const responseHandler = (
  res: Response,
  statusCode: number,
  data?: object
) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const errResponseHandler = (
  res: Response,
  next: NextFunction,
  statusCode: number,
  message?: string
) => {
  res.statusCode = statusCode;
  return next(
    new Error(message || "Something went wrong, please try again later")
  );
};
