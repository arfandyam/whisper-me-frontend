import { z } from 'zod';

// zod validator
export const CreateQuestionBodyValidator = z.object({
    topic: z.string().max(150, {
        message: "maksimal topic sebanyak 150 karakter."
    }),
    question: z.string(),
});
export const EditQuestionBodyValidator = CreateQuestionBodyValidator;


// type of zod validator
export type TCreateQuestionBodyValidator = z.infer<typeof CreateQuestionBodyValidator>;
export type TEditQuestionBodyValidator = z.infer<typeof EditQuestionBodyValidator>;