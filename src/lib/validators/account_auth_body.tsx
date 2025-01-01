import { z } from 'zod';

export const AuthBodyValidator = z.object({
    username: z.string(),
    password: z.string().min(8, {
        message: "minimal password lebih dari 8 karakter."
    })
});

export type TAuthBodyValidator = z.infer<typeof AuthBodyValidator>;