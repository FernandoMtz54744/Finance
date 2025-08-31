import type { loginSchema, registerSchema } from "@/validations/authSchema";
import { z } from "zod"

export type LoginFormType = z.infer<typeof loginSchema>;

export type RegisterFormType = z.infer<typeof registerSchema>;