import { Document, model, Schema } from "mongoose";
import { UserDocument } from "./user";

export interface PetDocument {
  id: string;
  owner: UserDocument["id"];
  name: string;
  type: string;
  bread: string;
  size: string;
  images: string[];
}

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bread: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

export type PetModelType = PetDocument & Document;

export default model<PetModelType>("Pet", petSchema);
