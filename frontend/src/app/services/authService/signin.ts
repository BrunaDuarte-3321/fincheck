import { httpClient } from "../httpClient";
import { AuthResponse, authResponse } from "./authSchema";

interface ISigninParams {
  email: string;
  password: string;
}

export async function signin(params: ISigninParams): Promise<AuthResponse> {
  const { data } = await httpClient.post("/auth/signin", params);

  return authResponse.parse(data);
}
