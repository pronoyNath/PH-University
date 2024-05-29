import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    { role: "student" },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  //lean help us to query faster

  //for very first student there will be no id so undefined
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year, semester-code, 4digit-code
export const generateStudentId = async (payload: TAcademicSemester) => {
  // fist time 0000
  const currentId = (await findLastStudentId()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
