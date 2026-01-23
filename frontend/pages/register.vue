<template>
  <div class="container">
    <div class="auth-page">
      <div class="card auth-card">
        <h1>Register</h1>

        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Enter your password (min 6 characters)"
              required
              minlength="6"
            />
          </div>

          <div class="input-group">
            <label for="role">Role</label>
            <select id="role" v-model="formData.role" required>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="pending"
          >
            <span v-if="pending">Registering...</span>
            <span v-else>Register</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Already have an account?
            <NuxtLink to="/login">Login</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RegisterData } from '~/types/auth';
import { UserRole } from '~/types/auth';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive<RegisterData>({
  name: '',
  email: '',
  password: '',
  role: UserRole.PATIENT
});

const pending = ref(false);
const error = ref<string | null>(null);

const handleSubmit = async () => {
  pending.value = true;
  error.value = null;

  try {
    await authStore.register(formData);
    router.push('/');
  } catch (err: any) {
    error.value = err.data?.error || 'Registration failed. Please try again.';
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

      select {
        width: 100%;
        padding: $spacing-sm $spacing-md;
        border: 1px solid $border-color;
        border-radius: $border-radius-md;
        font-size: $font-size-md;
        font-family: inherit;

        &:focus {
          outline: none;
          border-color: $primary-color;
        }
      }
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
