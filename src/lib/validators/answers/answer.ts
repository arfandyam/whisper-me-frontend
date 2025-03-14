import { z } from "zod";

export const CreateAnswerBodyValidator = z.object({
    response: z.string(),
})

export type TCreateAnswerBodyValidator = z.infer<typeof CreateAnswerBodyValidator>;