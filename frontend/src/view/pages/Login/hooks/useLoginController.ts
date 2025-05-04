import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Informe um email valido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter de 8 caracteres"),
});

type IFields = z.infer<typeof schema>;
export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<IFields>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    /* schema.parse(data); */
    console.log(data);
  });
  return { handleSubmit, register, errors };
}
