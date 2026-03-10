import z from "zod";

/**
 * User login validation schema matching UserLoginDto
 */
export const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(13, "Password must be less than 13 characters"),
});

/**
 * User registration validation schema matching UserCreateDto
 */
export const SignupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .max(13, "Password must be less than 13 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .max(13, "Confirm password must be less than 13 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

/**
 * Forgot password validation schema
 */
export const ForgotValidator = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

/**
 * Edit user validation schema
 */
export const EditUserValidator = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(100, "Name must be less than 100 characters"),
});

/**
 * Password change validation schema
 */
export const PasswordValidator = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignInFormData = z.infer<typeof SignInSchema>;
export type SignupFormData = z.infer<typeof SignupSchema>;
export type ForgotFormData = z.infer<typeof ForgotValidator>;
export type EditUserFormData = z.infer<typeof EditUserValidator>;
export type PasswordFormData = z.infer<typeof PasswordValidator>;
