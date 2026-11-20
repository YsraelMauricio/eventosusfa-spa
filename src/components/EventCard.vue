<template>
  <article class="card">
    <div class="card-body">
      <h3 class="card-title">{{ evento.titulo }}</h3>
      <p class="card-text">{{ evento.categoria }} · {{ evento.lugar }}</p>
      <button class="btn btn-primary" @click="$emit('ver', evento.id)">Ver detalle</button>
    </div>
  </article>
</template>

<script setup>
defineProps(['evento']);
const emit = defineEmits(['ver']);
</script>
