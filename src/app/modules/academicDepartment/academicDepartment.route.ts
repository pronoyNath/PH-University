import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentsController } from "./academicDepartment.controller";

const router = express.Router();

// will call controller funtion
router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentsController.createAcademicDepartment
);

router.get(
  "/:departmentId",
  AcademicDepartmentsController.getSingleAcademicDepartment
);

router.get("/", AcademicDepartmentsController.getAllAcademicDepartments);

router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentsController.updateAcademicDepartment
);

export const AcademicDepartmentsRoutes = router;
