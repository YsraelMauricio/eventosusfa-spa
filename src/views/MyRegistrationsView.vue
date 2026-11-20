<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { get } from '../services/api';

const auth = useAuthStore();
const eventos = ref([]);
const cargando = ref(false);
const error = ref('');

async function cargar() {
  if (!auth.token) return;
  cargando.value = true;
  error.value = '';
  try {
    const data = await get('/me/registrations', { requiresAuth: true });
    eventos.value = data?.data ?? [];
  } catch (e) {
    error.value = e.message;
  } finally {
    cargando.value = false;
  }
}

cargar();
</script>

<template>
  <section>
    <h1>Mis inscripciones</h1>
    <div v-if="cargando" class="alert alert-info">Cargando...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else-if="eventos.length === 0" class="alert alert-info">Aún no te has inscrito a ningún evento.</div>
    <ul v-else>
      <li v-for="r in eventos" :key="r.id">
        {{ r.event?.titulo }} · {{ r.code }}
      </li>
    </ul>
  </section>
</template>
