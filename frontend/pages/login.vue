<template>
  <div class="container">
    <div class="auth-page">
      <div class="card auth-card">
        <h1>Login</h1>

        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="pending"
          >
            <span v-if="pending">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Don't have an account?
            <NuxtLink to="/register">Register</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginCredentials } from '~/types/auth';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive<LoginCredentials>({
  email: '',
  password: ''
});

const pending = ref(false);
const error = ref<string | null>(null);

const handleSubmit = async () => {
  pending.value = true;
  error.value = null;

  try {
    await authStore.login(formData);
    router.push('/');
  } catch (err: any) {
    error.value = err.data?.error || 'Login failed. Please try again.';
  } finally {
    pending.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 0;

  .auth-card {
    width: 100%;
    max-width: 400px;

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: $primary-color;
    }

    form {
      margin-bottom: 1.5rem;
    }

    .btn-block {
      width: 100%;
      margin-top: 1rem;
    }

    .auth-footer {
      text-align: center;
      padding-top: 1rem;
      border-top: 1px solid $border-color;

      a {
        color: $primary-color;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
