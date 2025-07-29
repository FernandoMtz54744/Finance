import type { authSchema } from "@/validations/authSchema";
import { z } from "zod"

export type AuthFormType = z.infer<typeof authSchema>;