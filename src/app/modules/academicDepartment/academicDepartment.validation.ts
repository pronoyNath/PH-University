import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department name must be string",
      })
      .min(1, { message: "Academic Department name is required." }),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty Id must be string",
      })
      .min(1, { message: "Academic Faculty Id is required." }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department name must be string",
      })
      .min(1, { message: "Academic Department name is required." }),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty Id must be string",
      })
      .min(1, { message: "Academic Faculty Id is required." }).optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
