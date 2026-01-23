<template>
  <div class="container">
    <div class="page">
      <h1>Chat Rooms</h1>
      <p>Coming soon in Phase 2...</p>
      <NuxtLink to="/" class="btn btn-secondary">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>

<style lang="scss" scoped>
.page {
  padding: 2rem;
  text-align: center;

  h1 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }
}
</style>
