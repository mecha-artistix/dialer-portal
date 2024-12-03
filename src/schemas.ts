import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string({ message: "username is required" }),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const NonAgentApiSchema = z.object({
  dialer_url: z.string(),
  folder_name: z.string(),
  user: z.string().min(1, "User is required"),
  pass: z.string().min(1, "Password is required"),
  agent_user: z.string(),
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
