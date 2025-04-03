import bcrypt from "bcrypt";
import { Schema, model, models } from "mongoose";

const userShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "client", "admin"],
    },

    // todo: varified work
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userShema);

export default User;
