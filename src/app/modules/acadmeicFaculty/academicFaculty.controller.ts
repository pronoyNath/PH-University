import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyervices } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createAcademicfaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // // will call service func to send this data
    const result = await AcademicFacultyervices.createAcademicFacultyIntoDB(
      req.body
    );

    // globally response handle
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic faculty is created sucessfully",
      data: result,
    });
  }
);

const getAllAcademicfaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyervices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculties are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicfaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyervices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty is retrieved succesfully",
    data: result,
  });
});

const updateAcademicfaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyervices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated succesfully',
    data: result,
  });
});

export const AcademicfacultiesController = {
  createAcademicfaculty,
  getAllAcademicfaculties,
  getSingleAcademicfaculty,
  updateAcademicfaculty
};
