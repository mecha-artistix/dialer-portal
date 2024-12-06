import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string({ message: "username is required" }),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

type VicidialBaseSchema = {
  dialer_url: z.ZodString;
  folder_name: z.ZodString;
  user: z.ZodString;
  pass: z.ZodString;
  date: z.ZodString;
};

type VicidialFilterSchema = VicidialBaseSchema & {
  statusFilter: z.ZodArray<z.ZodString>;
};

type VicidialSingleAgentSchema = VicidialBaseSchema & {
  agent_user: z.ZodString;
};

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
