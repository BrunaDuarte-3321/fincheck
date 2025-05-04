import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Informe um email valido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter de 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
