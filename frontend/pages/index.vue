<template>
  <div class="container">
    <div class="home-page">
      <h1>DocTalk - Health Consultation Messenger</h1>

      <div v-if="authStore.isAuthenticated" class="user-info">
        <p>Welcome, {{ authStore.user?.name }}!</p>
        <p>Role: {{ authStore.user?.role }}</p>
        <button class="btn btn-secondary" @click="handleLogout">Logout</button>
      </div>

      <div v-else class="auth-links">
        <NuxtLink to="/login" class="btn btn-primary">Login</NuxtLink>
        <NuxtLink to="/register" class="btn btn-secondary">Register</NuxtLink>
      </div>

      <div class="navigation-links" v-if="authStore.isAuthenticated">
        <h2>Navigation</h2>
        <ul>
          <li><NuxtLink to="/chat">Chat Rooms</NuxtLink></li>
          <li><NuxtLink to="/doctors">Doctors</NuxtLink></li>
          <li><NuxtLink to="/reservations">Reservations</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 600px;
  margin: 3rem auto;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
    color: $primary-color;
  }

  .user-info {
    margin: 2rem 0;
    padding: 2rem;
    background-color: $bg-primary;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-md;

    p {
      margin-bottom: 1rem;
      font-size: $font-size-lg;
    }

    button {
      margin-top: 1rem;
    }
  }

  .auth-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
  }

  .navigation-links {
    margin-top: 3rem;
    text-align: left;

    h2 {
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;

      li {
        margin-bottom: 0.5rem;

        a {
          color: $primary-color;
          text-decoration: underline;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
