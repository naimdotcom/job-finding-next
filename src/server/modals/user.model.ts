import bcrypt from "bcryptjs";
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

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userShema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = models.User || model("User", userShema);

export default User;
