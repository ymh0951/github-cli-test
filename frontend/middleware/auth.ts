export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // If user is not authenticated and trying to access protected route
  if (!authStore.isAuthenticated) {
    // Allow access to login and register pages
    if (to.path === '/login' || to.path === '/register') {
      return;
    }

    // Redirect to login for other protected routes
    return navigateTo('/login');
  }

  // If user is authenticated and trying to access login/register
  if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/');
  }
});
