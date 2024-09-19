import { z } from "zod";

export const schema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome obrigatório",
  }),
  email: z.string().trim().email({
    message: "Email inválido",
  }),
});