import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { useAuthStore } from "../../store/authStore";
import { LoginFormData, RegisterFormData } from "../../types";

const API = axios.create({
  baseURL: "https://2ca325186529.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const PUBLIC_ENDPOINTS = [
  "/accounts/register/",
  "/accounts/token/",
  "/accounts/send-reset-password-link/",
];

API.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!accessToken && !isPublic) {
      throw new Error("Unauthorized: Please login first");
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const response = error?.response;
    const data = response?.data ?? {};
    const config = error?.config ?? {};
    const message =
      data?.detail ||
      data?.message ||
      "Unexpected error. Check network or backend response.";

    if (response?.status === 401) {
      const { setTokens } = useAuthStore.getState();
      setTokens("", "");
      Alert.alert("Session Expired", "Please login again.");
    }

    return Promise.reject(error);
  }
);

export const registerUser = (
  data: RegisterFormData
): Promise<AxiosResponse> => {
  return API.post("/accounts/register/", data);
};

export const loginUser = (
  data: LoginFormData
): Promise<AxiosResponse<{ access: string; refresh: string }>> => {
  return API.post("/accounts/token/", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const sendResetPasswordLink = (
  email: string
): Promise<AxiosResponse> => {
  return API.post("/accounts/send-reset-password-link/", { email }).then(
    (response) => {
      return response;
    }
  );
};

export default API;
