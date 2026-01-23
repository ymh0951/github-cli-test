export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  // Initialize auth on app start
  authStore.initializeAuth();
});
