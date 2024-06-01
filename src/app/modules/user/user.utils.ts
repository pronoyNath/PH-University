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
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year, semester-code, 4digit-code
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString(); //by  default id '0000'
  const lastStudentId = await findLastStudentId(); //2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4,6) //01
  const lastStudentYear = lastStudentId?.substring(0,4) //2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
