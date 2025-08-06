import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters' })
    .max(50, { message: 'Full name must be under 50 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});


export type RegisterFormData = z.infer<typeof registerSchema>;
