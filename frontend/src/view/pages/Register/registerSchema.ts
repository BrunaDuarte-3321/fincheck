import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Informe um email valido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter de 8 caracteres"),
});

export type FormRegisterData = z.infer<typeof registerSchema>;
