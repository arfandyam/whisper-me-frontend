import { z } from 'zod';

export const UserRegistrationBodyValidator = z.object({
    username: z.string().min(4, {
        message: "minimal username lebih dari 4 karakter."
    }),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string().min(8, {
        message: "minimal password lebih dari 8 karakter."
    }),
});

export type TUserRegistrationBodyValidator = z.infer<typeof UserRegistrationBodyValidator>;