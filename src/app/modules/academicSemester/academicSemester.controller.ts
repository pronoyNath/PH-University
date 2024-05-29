import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // // will call service func to send this data
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body
    );

    // globally response handle
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester is created sucessfully",
      data: result,
    });
  }
);

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semesters are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrieved succesfully",
    data: result,
  });
});

export const AcademicSemestersController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
};
