<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="navbar navbar-expand bg-primary" data-bs-theme="dark">
    <nav class="container" aria-label="Navegación principal">
      <RouterLink class="navbar-brand" to="/">EventosUSFA</RouterLink>
      <RouterLink class="nav-link text-white" to="/about">Acerca del proyecto</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
