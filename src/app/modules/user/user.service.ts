import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  /* if (!password) {
      user.password = config.default_password as string;
    }else{
      user.password = password;
    } */

  // writing if else in different way for setting password
  userData.password = password || (config.default_password as string);

  //   set student role
  userData.role = "student";

  //set manually generated Id.
  userData.id = "2030030110";

  //   create a user
  const newUser = await UserModel.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    //  (studentData.id) student custom id , (studentData.user) for user ref
    studentData.id = newUser.id; // embeding id
    studentData.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
