import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (access, refresh) => set({ accessToken: access, refreshToken: refresh }),
  showPassword: false,
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
}));
