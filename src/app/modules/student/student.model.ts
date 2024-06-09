import { Schema, model } from "mongoose";
import validator from "validator";

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not captialize format",
    },
  },
  middleName: {
    type: String,
    required: [true, "Middle Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father Name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact is required"],
  },
  motherName: { type: String, required: [true, "Mother Name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact is required"],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local Guardian Name is required"] },
  occupation: {
    type: String,
    required: [true, "Local Guardian Occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian Contact Number is required"],
  },
  address: {
    type: String,
    required: [true, "Local Guardian Address is required"],
  },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User Id is required."],
    unique: true,
    ref: "User", //table connection--> here "User" is Model name
  },
  name: {
    type: UserNameSchema,
    required: [true, "Student Name is required"],
  },

  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "The gender field can only be one of the following: 'male', 'female', or 'other'",
    },
    required: [true, "Gender is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email type.',
    // },
  },
  dateOfBirth: { type: Date, required: [true, "Date of Birth is required"] },
  contactNo: { type: String, required: [true, "Contact Number is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact Number is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address is required"],
  },
  guardian: {
    type: GuardianSchema,
    required: [true, "Guardian information is required"],
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: [true, "Local Guardian information is required"],
  },
  profileImg: { type: String, required: [true, "Profile Image is required"] },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// middleware (document)

//virtual
studentSchema.virtual("fullName").get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

//middleware(query)
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  //[{ $match: { isDeleted: { $ne: true } } },{match}]
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const StudentModel = model<TStudent>("Student", studentSchema);
