import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData, loginSchema } from "../loginSchema ";
import { authService } from "../../../../app/services/authService/index";

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { mutateAsync: login } = useMutation({
    mutationFn: (data: LoginFormData) => authService.signin(data),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { accessToken } = await login(data);
    console.log(accessToken);
  });

  return { handleSubmit, register, errors };
}
