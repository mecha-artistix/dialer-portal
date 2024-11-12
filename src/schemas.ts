import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string({ message: "username is required" }),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
