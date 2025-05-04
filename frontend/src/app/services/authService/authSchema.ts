import { z } from "zod";

export const authResponse = z.object({
  accessToken: z.string(),
});

export type AuthResponse = z.infer<typeof authResponse>;
