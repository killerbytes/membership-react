import z from "zod";

export const memberBaseSchema = z.object({
  email: z
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

export const memberRegisterSchema = memberBaseSchema
  .extend({
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

export const memberInputSchema = memberBaseSchema.extend({
  firstName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  middleName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  tinNo: z.string().optional(),
  rsbsaNo: z.string().optional(),
  registeredAddress1: z.string(),
  registeredAddress2: z.string().optional(),
  registeredBarangay: z.string(),
  registeredCity: z.string(),
  currentAddress1: z.string(),
  currentAddress2: z.string().optional(),
  currentBarangay: z.string(),
  currentCity: z.string(),
  photoUrl: z.string().optional(),
  validIdUrl: z.string().optional(),
  currentAddress: z.boolean().optional(),
});

export const memberSchema = memberInputSchema.extend({
  id: z.number(),
});

export type MemberBase = z.infer<typeof memberBaseSchema>;
export type MemberInput = z.infer<typeof memberInputSchema>;
export type Member = z.infer<typeof memberSchema>;
