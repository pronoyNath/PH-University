import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      // required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "student", "faculty"],
      },
    },
    status: {
      type: String,
      enum: {
        values: ["in-progress", "blocked"],
      },
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//pre save middleware/ hook
userSchema.pre("save", async function (next) {
  const user = this;
  // hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

//post save middleware/ hook
userSchema.post("save", function (doc, next) {
  // before sending clint making pass empty for showing user
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("user", userSchema);
