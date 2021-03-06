import { Document, model, Schema } from "mongoose";

export interface UserDocument {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
  status: string;
  role: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    avatar: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
    status: {
      type: String,
      default: "enabled",
    },
    role: {
      type: String,
      default: "manager",
    },
  },
  { timestamps: true }
);

export type UserModelType = UserDocument & Document;

export default model<UserModelType>("User", userSchema);
