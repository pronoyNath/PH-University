import { z } from "zod";

const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .min(1, { message: "Password is required." })
    .max(20, { message: "Password cannot be more than 20 characters." })
    .optional(),
});

export default UserValidationSchema;
