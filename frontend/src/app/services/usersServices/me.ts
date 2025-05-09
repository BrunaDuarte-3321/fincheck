import { httpClient } from "../httpClient";
import { meResponse, MeResponse } from "./meSchema";

export async function me(): Promise<MeResponse> {
  const { data } = await httpClient.get("/users/me");

  return meResponse.parse(data);
}
