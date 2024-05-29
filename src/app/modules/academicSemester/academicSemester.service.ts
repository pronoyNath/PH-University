import { academicSemesterCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name ==> semester code
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code.");
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
};
