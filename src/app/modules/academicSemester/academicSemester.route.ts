import express from "express";

import { StudentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemestersController } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();

// will call controller funtion
router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemestersController.createAcademicSemester
);

router.get(
  '/:semesterId',
  AcademicSemestersController.getSingleAcademicSemester,
);

router.get('/', AcademicSemestersController.getAllAcademicSemesters);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemestersController.updateAcademicSemester,
);


export const AcademicSemesterRoutes = router;
