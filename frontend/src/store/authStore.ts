import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginRequest, RegisterRequest } from '@/types';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (token: string, user: any) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ token, user, isAuthenticated: true });
      },

      login: async (credentials: LoginRequest) => {
        try {
          const response = await apiClient.login(credentials);
          get().setAuth(response.token, response.user);
          toast.success(`Welcome back, ${response.user.username}!`);
        } catch (error: any) {
          const message = error.response?.data?.error || 'Login failed';
          toast.error(message);
          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        try {
          const response = await apiClient.register(userData);
          get().setAuth(response.token, response.user);
          toast.success(`Welcome, ${response.user.username}!`);
        } catch (error: any) {
          const message = error.response?.data?.error || 'Registration failed';
          toast.error(message);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
        toast.success('Logged out successfully');
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);