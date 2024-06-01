import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicfacultiesController } from "./academicFaculty.controller";

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

router.get("/", AcademicfacultiesController.getAllAcademicfaculties);

router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema 
  ),
  AcademicfacultiesController.updateAcademicfaculty
);

export const AcademicFacultyRoutes = router;
