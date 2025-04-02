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
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },

    // todo: varified work
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userShema);

export default User;
