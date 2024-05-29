import { z } from "zod";
import {
  AcademicSemesterCodeSchema,
  AcademicSemesterNameSchema,
  MonthsSchema,
} from "./academicSemester.constant";

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNameSchema] as [string, ...string[]])
      .or(
        z.string().min(1, { message: "Academic semester name is required." })
      ),
    code: z
      .enum([...AcademicSemesterCodeSchema] as [string, ...string[]])
      .or(
        z.string().min(1, { message: "Academic semester code is required." })
      ),
    year: z.string().length(4, { message: "Year must be 4 characters long." }),
    startMonth: z
      .enum([...MonthsSchema] as [string, ...string[]])
      .or(z.string().min(1, { message: "Start month is required." })),
    endMonth: z
      .enum([...MonthsSchema] as [string, ...string[]])
      .or(z.string().min(1, { message: "End month is required." })),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
