import { z } from "zod";

export const meResponse = z.object({
  name: z.string(),
  email: z.string(),
});

export type MeResponse = z.infer<typeof meResponse>;
