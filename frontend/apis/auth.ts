import type { LoginCredentials, RegisterData, AuthResponse, User } from '~/types/auth';

export const authApi = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const config = useRuntimeConfig();
    const response = await $fetch<AuthResponse>(`${config.public.apiBase}/auth/register`, {
      method: 'POST',
      body: data
    });
    return response;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const config = useRuntimeConfig();
    const response = await $fetch<AuthResponse>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: credentials
    });
    return response;
  },

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const config = useRuntimeConfig();
    const response = await $fetch<{ accessToken: string }>(`${config.public.apiBase}/auth/refresh`, {
      method: 'POST',
      body: { refreshToken }
    });
    return response;
  },

  async logout(token: string): Promise<void> {
    const config = useRuntimeConfig();
    await $fetch(`${config.public.apiBase}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  async getCurrentUser(token: string): Promise<User> {
    const config = useRuntimeConfig();
    const response = await $fetch<User>(`${config.public.apiBase}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }
};
