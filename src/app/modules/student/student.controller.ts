import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;

//     // data validation using zod
//     const zodParsedData = StudentValidationSchema.parse(studentData);

//     // will call service func to send this data
//     const result = await StudentServices.createStudentIntoDB(zodParsedData);

//     // send response
//     res.status(200).json({
//       succuess: true,
//       message: 'Student is created sucessfully',
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       succuess: false,
//       message: 'Something went wrong',
//       error: err,
//     });
//   }
// };

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    // res.status(200).json({
    //   succuess: true,
    //   message: "Students are retrieve sucessfully",
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrieve sucessfully",
      data: result,
    });

  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // res.status(200).json({
    //   succuess: true,
    //   message: "Student is retrieve sucessfully",
    //   data: result,
    // });

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
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    // res.status(200).json({
    //   succuess: true,
    //   message: "Student is deleted sucessfully",
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted sucessfully",
      data: result,
    });


  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
