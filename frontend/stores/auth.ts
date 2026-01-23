import { defineStore } from 'pinia';
import type { User, LoginCredentials, RegisterData } from '~/types/auth';
import { authApi } from '~/apis/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user
  },

  actions: {
    async register(data: RegisterData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authApi.register(data);
        this.user = response.user;
        this.accessToken = response.accessToken;
        this.refreshToken = response.refreshToken;

        // Store tokens in localStorage
        if (process.client) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      } catch (error: any) {
        this.error = error.data?.error || 'Registration failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async login(credentials: LoginCredentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authApi.login(credentials);
        this.user = response.user;
        this.accessToken = response.accessToken;
        this.refreshToken = response.refreshToken;

        // Store tokens in localStorage
        if (process.client) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      } catch (error: any) {
        this.error = error.data?.error || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        if (this.accessToken) {
          await authApi.logout(this.accessToken);
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;

        // Remove tokens from localStorage
        if (process.client) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    },

    async refreshAccessToken() {
      if (!this.refreshToken) {
        throw new Error('No refresh token available');
      }

      try {
        const response = await authApi.refresh(this.refreshToken);
        this.accessToken = response.accessToken;

        // Update token in localStorage
        if (process.client) {
          localStorage.setItem('accessToken', response.accessToken);
        }

        return response.accessToken;
      } catch (error) {
        // If refresh fails, logout
        await this.logout();
        throw error;
      }
    },

    async fetchCurrentUser() {
      if (!this.accessToken) {
        throw new Error('No access token available');
      }

      try {
        const user = await authApi.getCurrentUser(this.accessToken);
        this.user = user;
      } catch (error) {
        throw error;
      }
    },

    async initializeAuth() {
      if (process.client) {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
          this.accessToken = accessToken;
          this.refreshToken = refreshToken;

          try {
            await this.fetchCurrentUser();
          } catch (error) {
            // If fetching user fails, try refreshing token
            try {
              await this.refreshAccessToken();
              await this.fetchCurrentUser();
            } catch (refreshError) {
              // If refresh also fails, logout
              await this.logout();
            }
          }
        }
      }
    }
  }
});
