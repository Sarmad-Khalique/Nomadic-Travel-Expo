interface RegisterFormData {
  email: string;
  password: string;
  full_name: string; // If required in the form; otherwise remove
}

interface LoginFormData {
  email: string;
  password: string;
}

export type RegisterPayload = {
  email: string;
  password: string;
  full_name: string;
};

export interface ForgetPasswordData {
  email: string;
}