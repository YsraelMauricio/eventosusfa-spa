<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');

async function onSubmit() {
  error.value = '';
  try {
    await auth.login(email.value, password.value);
    await router.push('/');
  } catch (e) {
    error.value = e.message ?? 'Credenciales incorrectas.';
  }
}

import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <section class="auth">
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">Correo</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button class="btn btn-primary" type="submit" :disabled="auth.token">Entrar</button>
    </form>
  </section>
</template>
