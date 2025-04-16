import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string({ message: "username is required" }),
  email: z.string().email(),
  password: z.string(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z.string().min(1, { message: "username is required" }),
  password: z.string().min(1, { message: "password is required" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const AddDialerSchema = z.object({
  name: z.string({ message: "name is required" }),
  folder_name: z.string(),
  url: z.string({ message: "url is required" }),
  user: z.string().min(1, "User is required"),
  pass: z.string().min(1, "Password is required"),
});

export type AddDialerFormType = z.infer<typeof AddDialerSchema>;

export const ViciRequiredParams = z.object({
  dialer_url: z.string(),
  user: z.string(),
  pass: z.string(),
  // date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});
export type ViciRequiredParamsType = z.infer<typeof ViciRequiredParams>;

export const ViciFilterParams = z.object({
  date: z
    .string()
    // .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .optional(),
  agent_user: z.string().optional(),
  status: z.array(z.string()).optional().nullable(),
  lead_id: z.string().optional(),
  phone_number: z.string().optional(),
});

export type ViciFilterParamsType = z.infer<typeof ViciFilterParams>;

export const TranscriptionsForm = z.object({
  email: z.string().email(),
  // status: z.string().optional(),
  // dialer: z.string().optional(),
});

export type TranscriptionsFormType = z.infer<typeof TranscriptionsForm>;
