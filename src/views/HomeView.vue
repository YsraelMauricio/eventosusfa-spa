<script setup>
import { ref } from 'vue';
import EventCard from '../components/EventCard.vue';

const props = defineProps({
  eventos: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['ver']);

const filtro = ref('');

const lista = ref([]);

function aplicarFiltro() {
  const termino = filtro.value.trim().toLowerCase();
  lista.value = props.eventos.filter(
    (e) => e.titulo.toLowerCase().includes(termino) || e.descripcion.toLowerCase().includes(termino),
  );
}
</script>

<template>
  <section>
    <input v-model="filtro" type="text" placeholder="Buscar eventos" class="form-control mb-3" />
    <div v-if="lista.length === 0" class="alert alert-info">No hay eventos para mostrar.</div>
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="evento in lista" :key="evento.id" class="col">
        <EventCard :evento="evento" @ver="(id) => emit('ver', id)" />
      </div>
    </div>
  </section>
</template>
