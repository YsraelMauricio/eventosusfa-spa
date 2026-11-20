<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import EventCard from '../components/EventCard.vue';

const router = useRouter();
const filtro = ref('');
const eventos = ref([
  { id: 1, titulo: 'Taller de Git y GitHub', categoria: 'Taller', lugar: 'Laboratorio 3', descripcion: 'Práctica de control de versiones.' },
  { id: 2, titulo: 'Conferencia de inteligencia artificial', categoria: 'Conferencia', lugar: 'Auditorio principal', descripcion: 'Aplicaciones de IA en Bolivia.' },
  { id: 3, titulo: 'Feria de proyectos universitarios', categoria: 'Feria', lugar: 'Patio central', descripcion: 'Proyectos de la comunidad estudiantil.' },
]);

const eventosFiltrados = computed(() => {
  const termino = filtro.value.trim().toLocaleLowerCase('es');
  if (!termino) return eventos.value;

  return eventos.value.filter((evento) =>
    `${evento.titulo} ${evento.categoria} ${evento.lugar} ${evento.descripcion}`
      .toLocaleLowerCase('es')
      .includes(termino),
  );
});

function verEvento(id) {
  router.push({ name: 'event-detail', params: { id: String(id) } });
}
</script>

<template>
  <main class="container py-4">
    <h1>Próximos eventos</h1>
    <label for="filtro-eventos" class="form-label">Buscar por título, categoría o lugar</label>
    <input id="filtro-eventos" v-model="filtro" class="form-control mb-4" type="search" />

    <p v-if="eventosFiltrados.length === 0" class="alert alert-info" role="status">
      No hay eventos que coincidan con «{{ filtro }}».
    </p>
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="evento in eventosFiltrados" :key="evento.id" class="col">
        <EventCard :evento="evento" @ver="verEvento" />
      </div>
    </div>
  </main>
</template>
