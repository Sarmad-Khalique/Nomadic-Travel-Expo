import { useMutation } from "@tanstack/react-query";
import {
  ForgetPasswordData,
  LoginFormData,
  RegisterPayload,
} from "../../types";
import { loginUser, registerUser, sendResetPasswordLink } from "../api/auth";

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
    mutationFn: async (data: ForgetPasswordData) => {
      return await sendResetPasswordLink(data.email);
    },
  });
