import { create } from 'zustand';

interface AuthState {
  showPassword: boolean;
  togglePassword: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  showPassword: false,
  togglePassword: () =>
    set((state) => ({
      showPassword: !state.showPassword,
    })),
}));
