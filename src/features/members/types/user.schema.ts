import z from "zod";
import { memberSchema } from "./member.schema";

export const userBaseSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  mobile: z
    .string()
    .min(10, {
      message: "Mobile number must be at least 10 characters.",
    })
    .optional(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const userSchema = userBaseSchema.extend({
  id: z.number(),
  member: memberSchema,
});

const mobileRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
export const userCreateSchema = z
  .object({
    identifier: z.union([
      z.string().email({ message: "Invalid email format." }),
      z
        .string()
        .regex(mobileRegex, { message: "Invalid mobile number format." }),
    ]),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });
export type UserBase = z.infer<typeof userBaseSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type User = z.infer<typeof userSchema>;
