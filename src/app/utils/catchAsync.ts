import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  // higher order function
  return (req: Request, res: Response, next: NextFunction) => {
    //just because asynchronous fn that's why Promise will be return
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
