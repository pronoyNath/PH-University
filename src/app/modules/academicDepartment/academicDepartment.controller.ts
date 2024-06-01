import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // // will call service func to send this data
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    // globally response handle
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department is created sucessfully",
      data: result,
    });
  }
);

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Departments are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is retrieved succesfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is updated succesfully",
    data: result,
  });
});

export const AcademicDepartmentsController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
