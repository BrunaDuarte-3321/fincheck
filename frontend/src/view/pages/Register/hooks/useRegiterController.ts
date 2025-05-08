import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../../app/services/authService/index";
import { FormRegisterData, registerSchema } from "../registerSchema";
import { toast } from "react-hot-toast";

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormRegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormRegisterData) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      console.log({ accessToken });
    } catch {
      toast.error("Ocorreu um erro ao cadastrar sua conta");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
