import { useMutation } from "@tanstack/react-query";
import {
  ForgetPasswordData,
  LoginFormData,
  RegisterPayload,
  VerificationFormData,
} from "../../types";
import { loginUser, registerUser, sendResetPasswordLink, sendVerificationEmail } from "../api/auth";

export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
  });

export const useSendResetPasswordLink = () =>
  useMutation({
    mutationFn: (data: ForgetPasswordData) => sendResetPasswordLink(data),
  });

 export const useSendVerificationEmail = () =>
  useMutation({
    mutationFn: (email: VerificationFormData) => sendVerificationEmail(email),
  });
