import express from "express";
import { BookingsController } from "../controllers";
import { BookingsValidator, catchAsyncHandler } from "../helpers";
import { validateBody } from "../middlewares";

const bookingsRoutes = express.Router();
bookingsRoutes
  .route("/")
  .get(catchAsyncHandler(BookingsController.getBookings))
  .post(
    validateBody(BookingsValidator.createBookingValidationObject),
    catchAsyncHandler(BookingsController.createBooking)
  );

bookingsRoutes
  .route("/:id")
  .get(catchAsyncHandler(BookingsController.getBooking))
  .put(
    validateBody(BookingsValidator.updateBookingValidationObject),
    catchAsyncHandler(BookingsController.updateBooking)
  )
  .delete(catchAsyncHandler(BookingsController.deleteBooking));

export default bookingsRoutes;
