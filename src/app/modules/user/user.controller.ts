import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    // data validation using zod
    //   const zodParsedData = StudentValidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
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
    
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
