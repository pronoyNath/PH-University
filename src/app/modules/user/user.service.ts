import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // writing if else in different way for setting password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";


  // find academic semester info
  const admissionSemester  = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );

  //set generated Id.
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // create a user
  const newUser = await UserModel.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    //  (studentData.id) student custom id , (studentData.user) for user ref
    payload.id = newUser.id; // embeding id
    payload.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
