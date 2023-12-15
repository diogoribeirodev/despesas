import { z } from "zod";
import { userSchema } from "../../../../prisma/zod";

export const insertUserSchema = userSchema.omit({ id: true });

export const insertUserParams = insertUserSchema
  .extend({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name has to be a string.",
      })
      .min(5, { message: "Name has to be longer than 5 characters." })
      .max(50, { message: "Name has to be shorter than 50 characters." }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email has to be a string.",
      })
      .email({ message: "Email has to be a valid email." })
      .min(10, { message: "Email has to be longer than 10 characters." })
      .max(100, { message: "Email has to be shorter than 100 characters." }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password has to be a string.",
      })
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]).{8,}$/,
        {
          message:
            "Password must contain at least 8 characters, one uppercase, one number and one special character.",
        }
      ),
  })
  .strict();

export const userIdSchema = z
  .string({
    required_error: "User ID is required",
    invalid_type_error: "User ID has to be a string.",
  })
  .uuid({ message: "User ID has to be a valid UUID." });

export const userJWT = userSchema.omit({ password: true });

export type User = z.infer<typeof userSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UserId = z.infer<typeof userIdSchema>;
export type UserJWT = z.infer<typeof userJWT>;
