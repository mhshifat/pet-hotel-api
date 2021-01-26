import { NextFunction, Request, Response } from "express";
import { errResponseHandler, responseHandler } from "../helpers";
import { BookingModel } from "../models";

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allBookings = await BookingModel.find({})
    .populate("owner", "-password")
    .populate("pet");
  return responseHandler(res, 200, {
    bookings: allBookings,
  });
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { arrival, departure } = req.body;
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(arrival);
  const secondDate = new Date(departure);
  const diffDays = Math.round(Math.abs((+firstDate - +secondDate) / oneDay));
  const createdBooking = await BookingModel.create({
    ...req.body,
    totalFee: diffDays * 10,
  });
  return responseHandler(res, 201, {
    booking: createdBooking,
  });
};

const findBooking = async (res: Response, next: NextFunction, id: string) => {
  const booking = await BookingModel.findById(id)
    .populate("owner", "-password")
    .populate("pet");
  if (!booking) return errResponseHandler(res, next, 404, "Booking not found!");
  return booking;
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const booking = await findBooking(res, next, id);
  return responseHandler(res, 200, {
    booking: booking,
  });
};

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const existingBooking = await findBooking(res, next, id);
  existingBooking.set(req.body);
  await existingBooking.save();
  return responseHandler(res, 200, {
    booking: existingBooking,
  });
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const existingBooking = await findBooking(res, next, id);
  await existingBooking.delete();
  return responseHandler(res, 200, {
    booking: existingBooking,
  });
};
