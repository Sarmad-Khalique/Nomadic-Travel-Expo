import { otpSchema } from '@/validation/otpSchema';
import { z } from 'zod';

export type OTPFormData = z.infer<typeof otpSchema>;