import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicfacultiesController } from "./academicFaculty.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// will call controller funtion
router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicfacultiesController.createAcademicfaculty
);

router.get("/:facultyId", AcademicfacultiesController.getSingleAcademicfaculty);

router.get(
  "/",
  auth(USER_ROLE.student),
  AcademicfacultiesController.getAllAcademicfaculties
);

router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicfacultiesController.updateAcademicfaculty
);

export const AcademicFacultyRoutes = router;
