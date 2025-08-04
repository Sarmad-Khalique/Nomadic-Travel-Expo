import { z } from 'zod';
import { forgotPasswordSchema } from '../validation/forgotPasswordSchema';
import { loginSchema } from '../validation/loginSchema';
import { registerSchema } from '../validation/registerSchema';

export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type FormData = LoginFormData | RegisterFormData; 

