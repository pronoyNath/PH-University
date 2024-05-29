import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // data validation using zod
    try {
      // asynchronously handle schema
      await schema.parseAsync({ body: req.body });

      return next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
