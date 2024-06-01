import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExits = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND,"This Department is already exits!");
  }
  next();
});



// query middleware using before update
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExits = await AcademicDepartmentModel.findOne(query);
  if (!isDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, "This Department dosen't exits!");
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
