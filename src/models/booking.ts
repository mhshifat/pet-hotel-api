import { Document, model, Schema } from "mongoose";
import { PetDocument } from "./pet";
import { UserDocument } from "./user";

export interface BookingDocument {
  id: string;
  owner: UserDocument["id"];
  pet: PetDocument["id"];
  arrival: string;
  departure: string;
  status: string;
  notes?: string;
  employeeNotes?: string;
  cancellationNotes?: string;
  images: string[];
  totalFee: number;
}

const bookingSchema = new Schema(
  {
    arrival: {
      type: String,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "booked",
    },
    notes: {
      type: String,
      default: "",
    },
    employeeNotes: {
      type: String,
      default: "",
    },
    cancellationNotes: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    totalFee: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
  },
  { timestamps: true }
);

export type BookingModelType = BookingDocument & Document;

export default model<BookingModelType>("Booking", bookingSchema);
