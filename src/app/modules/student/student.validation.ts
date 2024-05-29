import { z } from "zod";

// Define the UserName ValidationSchema
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      {
        message: "First name must be capitalized",
      }
    ),
  middleName: z.string().min(1, "Middle Name is required"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name must contain only alphabetic characters",
    }),
});

// Define the Guardian ValidationSchema
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father Name is required"),
  fatherOccupation: z.string().min(1, "Father Occupation is required"),
  fatherContact: z.string().min(1, "Father Contact is required"),
  motherName: z.string().min(1, "Mother Name is required"),
  motherOccupation: z.string().min(1, "Mother Occupation is required"),
  motherContact: z.string().min(1, "Mother Contact is required"),
});

// Define the LocalGuardian ValidationSchema
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local Guardian Name is required"),
  occupation: z.string().min(1, "Local Guardian Occupation is required"),
  contactNo: z.string().min(1, "Local Guardian Contact Number is required"),
  address: z.string().min(1, "Local Guardian Address is required"),
});

// Define the Student ValidationSchema
const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({
          message:
            "The gender field can only be one of the following: 'male', 'female', or 'other'",
        }),
      }),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
      dateOfBirth: z.string().min(1, "Date of Birth is required"),
      contactNo: z.string().min(1, "Contact Number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency Contact Number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present Address is required"),
      permanentAddress: z.string().min(1, "Permanent Address is required"),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      profileImg: z.string().min(1, "Profile Image is required"),
    }),
  }),
});

export const StudentValidations = {
  CreateStudentValidationSchema,
};
