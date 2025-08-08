import { z } from 'zod';

export const otpSchema = z.object({
  otp: z
    .array(z.string().length(1, 'Each OTP field must be 1 character long'))
    .length(5, 'OTP must be 5 digits long'),
});

export type OTPFormData = z.infer<typeof otpSchema>;
