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
});

export const memberInputBaseSchema = memberBaseSchema.extend({
  firstName: z.string().trim().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().trim().min(1, {
    message: "Last name is required.",
  }),
  middleName: z.string().trim().min(1, {
    message: "Middle name is required.",
  }),
  tinNo: z.string().optional(),
  rsbsaNo: z.string().optional(),
  permanentAddress1: z.string().trim().min(1, {
    message: "Permanent address is required.",
  }),
  permanentAddress2: z.string().optional(),
  permanentBarangay: z.string().trim().min(1, {
    message: "Permanent barangay is required.",
  }),
  permanentCity: z.string().trim().min(1, {
    message: "Registered city is required.",
  }),
  currentAddress1: z.string().optional(),
  currentAddress2: z.string().optional(),
  currentBarangay: z.string().optional(),
  currentCity: z.string().optional(),
  photoUrl: z.string().optional(),
  validIdUrl: z.string().optional(),
  currentAddress: z.boolean().optional(),
});

const currentAddressRefinement = (data: any, ctx: z.RefinementCtx) => {
  if (!data.currentAddress) {
    if (!data.currentAddress1 || data.currentAddress1.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Current address is required.",
        path: ["currentAddress1"],
      });
    }
    if (!data.currentBarangay || data.currentBarangay.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Current barangay is required.",
        path: ["currentBarangay"],
      });
    }
    if (!data.currentCity || data.currentCity.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Current city is required.",
        path: ["currentCity"],
      });
    }
  }
};

export const memberInputSchema = memberInputBaseSchema.superRefine(
  currentAddressRefinement
);

export const memberSchema = memberInputBaseSchema
  .extend({
    id: z.number(),
    membershipId: z.string(),
    permanentCityName: z.string(),
    permanentBarangayName: z.string(),
    currentCityName: z.string(),
    currentBarangayName: z.string(),
  })
  .superRefine(currentAddressRefinement);

export type MemberBase = z.infer<typeof memberBaseSchema>;
export type MemberInput = z.infer<typeof memberInputSchema>;
export type Member = z.infer<typeof memberSchema>;
