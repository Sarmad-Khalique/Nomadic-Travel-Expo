import { z } from 'zod';

export const verificationSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address') // Custom error message for invalid email
    .nonempty('Email cannot be empty') // Custom error for empty email
    .min(5, 'Email must be at least 5 characters long') // Email length validation
    .max(100, 'Email must be less than 100 characters'), // Email length validation
});
