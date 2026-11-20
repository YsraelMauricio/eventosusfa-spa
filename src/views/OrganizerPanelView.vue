<script setup>
import { ref, computed } from 'vue';
import { get, post, put, del } from '../services/api';
import EventFormView from './EventFormView.vue';

const eventos = ref([]);
const cargando = ref(false);

const eventoEditando = ref(null);
const mostrarFormulario = ref(false);

async function cargar() {
  cargando.value = true;
  try {
    const data = await get('/me/events', { requiresAuth: true });
    eventos.value = data?.data ?? [];
  } finally {
    cargando.value = false;
  }
}

function crear() {
  eventoEditando.value = null;
  mostrarFormulario.value = true;
}

async function guardar(datos) {
  if (eventoEditando.value) {
    await put(`/events/${eventoEditando.value.id}`, datos, { requiresAuth: true });
  } else {
    await post('/events', datos, { requiresAuth: true });
  }
  await cargar();
}

async function eliminar(id) {
  await del(`/events/${id}`, { requiresAuth: true });
  await cargar();
}

async function inscribir(eventId) {
  await post(`/events/${eventId}/registrations`, {}, { requiresAuth: true });
}

cargar();
</script>

<template>
  <section>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Mis eventos</h1>
      <button class="btn btn-primary" @click="crear">Crear evento</button>
    </div>
    <div v-if="cargando" class="alert alert-info">Cargando...</div>
    <div v-else>
      <div v-for="e in eventos" :key="e.id" class="card mb-2">
        <div class="card-body">
          <h3 class="card-title">{{ e.titulo }}</h3>
          <p class="card-text">{{ e.categoria }} · {{ e.lugar }}</p>
          <div>
            <button class="btn btn-sm btn-outline-primary" @click="eventoEditando = e; mostrarFormulario = true">Editar</button>
            <button class="btn btn-sm btn-outline-danger" @click="eliminar(e.id)">Borrar</button>
          </div>
        </div>
      </div>
    </div>
    <EventFormView v-if="mostrarFormulario" :evento="eventoEditando" @guardado="mostrarFormulario = false" />
  </section>
</template>
