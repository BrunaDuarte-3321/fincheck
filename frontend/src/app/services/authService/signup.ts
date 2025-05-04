import { httpClient } from "../httpClient";
import { AuthResponse, authResponse } from "./authSchema";

interface ISignupParams {
  name: string;
  email: string;
  password: string;
}

export async function signup(params: ISignupParams): Promise<AuthResponse> {
  const { data } = await httpClient.post("/auth/signup", params);
  return authResponse.parse(data);
}
