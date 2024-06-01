import mongoose, { Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCodeSchema,
  MonthsSchema,
  AcademicSemesterNameSchema,
} from "./academicSemester.constant";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";

// Define the schema
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterNameSchema,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCodeSchema,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: MonthsSchema,
      required: true,
    },
    endMonth: {
      type: String,
      enum: MonthsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExits = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is already exits!!");
  }
  next();
});

// Create the model
const AcademicSemesterModel = mongoose.model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);

export default AcademicSemesterModel;
