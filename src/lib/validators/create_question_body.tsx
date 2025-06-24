import { z } from 'zod';

export const CreateQuestionBodyValidator = z.object({
    topic: z.string().max(150, {
        message: "maksimal topic sebanyak 150 karakter."
    }),
    question: z.string(),
});

export type TCreateQuestionBodyValidator = z.infer<typeof CreateQuestionBodyValidator>;