import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string({ message: "username is required" }),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const NonAgentApiSchema = z.object({
  dialer_url: z.string(),
  source: z.string(),
  user: z.string().min(1, "User is required"),
  pass: z.string().min(1, "Password is required"),
  agent_user: z.string().min(1, "Agent User is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  duration: z.enum(["Y", "N"]).default("Y"),
  header: z.enum(["YES", "NO"]).default("YES"),
  stage: z.enum(["tab", "json", "csv"]).default("tab"),
  phone: z.string().optional(),
});

export type NonAgentApiSchemaType = z.infer<typeof NonAgentApiSchema>;
