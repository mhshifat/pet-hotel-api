import { Request, Response } from "express";

export const rootRoute = (_: Request, res: Response) => {
  return res.status(200).json({
    name: "pet-hotel-api",
    version: "1.0.0",
    description: "APIs for a pet hotel",
  });
};
