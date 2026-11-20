<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const eventos = [
  { id: 1, titulo: 'Taller de Git y GitHub', categoria: 'Taller', lugar: 'Laboratorio 3', descripcion: 'Práctica de control de versiones.' },
  { id: 2, titulo: 'Conferencia de inteligencia artificial', categoria: 'Conferencia', lugar: 'Auditorio principal', descripcion: 'Aplicaciones de IA en Bolivia.' },
  { id: 3, titulo: 'Feria de proyectos universitarios', categoria: 'Feria', lugar: 'Patio central', descripcion: 'Proyectos de la comunidad estudiantil.' },
];

const evento = computed(() => eventos.find((item) => String(item.id) === String(route.params.id)));
</script>

<template>
  <main class="container py-4">
    <section v-if="!evento" class="alert alert-warning" role="status">
      No encontramos el evento solicitado.
      <RouterLink to="/">Volver al listado</RouterLink>
    </section>
    <article v-else>
      <p class="text-body-secondary">{{ evento.categoria }}</p>
      <h1>{{ evento.titulo }}</h1>
      <p>{{ evento.descripcion }}</p>
      <p><strong>Lugar:</strong> {{ evento.lugar }}</p>
      <p class="text-body-secondary">La inscripción se conectará con la API en el Día 14.</p>
      <RouterLink class="btn btn-outline-primary" to="/">Volver a eventos</RouterLink>
    </article>
  </main>
</template>
