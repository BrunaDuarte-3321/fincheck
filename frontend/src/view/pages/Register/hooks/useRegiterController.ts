import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../../app/services/authService/index";
import { FormRegisterData, registerSchema } from "../registerSchema";

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormRegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: login } = useMutation({
    mutationFn: (data: FormRegisterData) => authService.signup(data),
    /* onSuccess: (response) => {
      console.log("Usuário registrado com sucesso:", response);
    },
    onError: (error) => {
      console.error("Erro ao registrar:", error);
    }, */
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { accessToken } = await login(data);
    console.log({ accessToken });
  });

  return { handleSubmit, register, errors };
}
