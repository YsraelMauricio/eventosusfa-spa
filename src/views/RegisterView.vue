<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { get, post } from '../services/api';

const auth = useAuthStore();
const nombre = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

async function onSubmit() {
  error.value = '';
  try {
    const data = await post('/auth/register', {
      name: nombre.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value,
    });
    auth.token = data.token;
    auth.usuario = data.user;
    await get('/me', { requiresAuth: true });
  } catch (e) {
    error.value = e.message ?? 'No se pudo completar el registro.';
  }
}
</script>

<template>
  <section class="auth">
    <h1>Crear cuenta</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input v-model="nombre" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Correo</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button class="btn btn-primary" type="submit">Registrarse</button>
    </form>
  </section>
</template>
