import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, student: studentData } = req.body;


    // will call service func to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // send response
    // res.status(200).json({
    //   succuess: true,
    //   message: "Student is created sucessfully",
    //   data: result,
    // });

    // globally response handle
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is created sucessfully",
      data: result,
    });
  },
);

export const UserControllers = {
  createStudent,
};
