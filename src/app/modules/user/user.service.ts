import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // writing if else in different way for setting password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );

  // intialize session transaction 
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //set generated Id.
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );

    // create a user (transaction-01)
    const newUser = await UserModel.create([userData], { session });

    //   create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!");
    }
    //  (studentData.id) student custom id , (studentData.user) for user ref
    payload.id = newUser[0].id; // embeding id
    payload.user = newUser[0]._id; //reference id

    // transaction-02
    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
    }

    await session.commitTransaction(); //transaction successfull
    await session.endSession(); //terminated

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession(); //terminated
    throw new AppError(httpStatus.BAD_REQUEST,"Failed to create student!")
  }
};

export const UserServices = {
  createStudentIntoDB,
};
