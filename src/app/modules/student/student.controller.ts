import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

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

const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students is retrieve sucessfully",
      data: result,
    });
  }
);

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
