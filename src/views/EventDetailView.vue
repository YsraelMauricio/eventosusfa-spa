<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const evento = ref(null);
const cargando = ref(true);

fetch(`/api/events/${props.id}`)
  .then((r) => r.json())
  .then((data) => {
    evento.value = data?.data ?? null;
    cargando.value = false;
  })
  .catch(() => {
    cargando.value = false;
  });

const titulo = computed(() => evento.value?.titulo ?? '');
</script>

<template>
  <section v-if="cargando" class="alert alert-info">Cargando evento...</section>
  <section v-else-if="!evento" class="alert alert-warning">Evento no encontrado.</section>
  <section v-else>
    <h1>{{ titulo }}</h1>
    <p>{{ evento.descripcion }}</p>
    <p>{{ evento.categoria }} · {{ evento.lugar }}</p>
    <button class="btn btn-primary">Inscribirme</button>
  </section>
</template>
