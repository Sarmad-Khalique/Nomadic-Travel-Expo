import { useMutation } from '@tanstack/react-query';
import { LoginFormData, RegisterPayload } from '../../types';
import { loginUser, registerUser, sendResetPasswordLink } from '../api/auth';


export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (email: string) => sendResetPasswordLink(email),
  });
