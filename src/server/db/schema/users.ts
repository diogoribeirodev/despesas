import { z } from "zod";
import { userSchema } from "../../../../prisma/zod";

export const insertUserSchema = userSchema.omit({ id: true });

export const insertUserParams = insertUserSchema.extend({
  name: z.coerce
    .string()
    .min(5, { message: "Name has to be longer than 5 characters." })
    .max(50, { message: "Name has to be shorter than 50 characters." }),
  email: z.coerce
    .string()
    .email({ message: "Email has to be a valid email." })
    .min(10, { message: "Email has to be longer than 10 characters." })
    .max(100, { message: "Email has to be shorter than 100 characters." }),
  password: z.coerce
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]).{8,}$/,
      {
        message:
          "Password must contain at least 8 characters, one uppercase, one number and one special character.",
      }
    ),
});

export const userIdSchema = userSchema.pick({ id: true });
export const userJWT = userSchema.omit({ password: true });

export type User = z.infer<typeof userSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UserId = z.infer<typeof userIdSchema>["id"];
export type UserJWT = z.infer<typeof userJWT>;
