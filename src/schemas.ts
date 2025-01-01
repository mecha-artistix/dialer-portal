import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string({ message: "username is required" }),
  email: z.string().email(),
  password: z.string(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z.string({ message: "username is required" }),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

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
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .optional(),
  agent_user: z.string().optional(),
  status: z.array(z.string()).optional().nullable(),
  // folder_name: z.string().optional(),
  phone_number: z.string().optional(),
});

export type ViciFilterParamsType = z.infer<typeof ViciFilterParams>;

export const ViciAllRecordsSchema = z.object({
  dialer_url: z.string(),
  folder_name: z.string(),
  user: z.string().min(1, "User is required"),
  pass: z.string().min(1, "Password is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  agent_user: z.string().optional(),
  statusFilter: z.array(z.string()).optional().nullable(),
});

export const ViciRecordsByAgentSchema = ViciAllRecordsSchema.extend({
  agent_user: z.string().min(1),
});

export const ViciRecordsByStatusSchema = ViciAllRecordsSchema.extend({
  statusFilter: z.array(z.string()).nonempty("Atleast one filter must be selected"),
});

export const NonAgentApiSchema = z.object({
  dialer_url: z.string(),
  folder_name: z.string(),
  user: z.string().min(1, "User is required"),
  pass: z.string().min(1, "Password is required"),
  agent_user: z.string(),
  statusFilter: z.array(z.string()),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export type NonAgentApiSchemaType = z.infer<typeof NonAgentApiSchema>;

export const AddDialerSchema = z.object({
  name: z.string({ message: "name is required" }),
  folder_name: z.string(),
  url: z.string({ message: "url is required" }),
  user: z.string().min(1, "User is required"),
  pass: z.string().min(1, "Password is required"),
});

export type AddDialerFormType = z.infer<typeof AddDialerSchema>;
