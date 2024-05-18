<template>
  <main class="max-w-screen overflow-x-hidden">
    <MainHeader />
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Magic Football - ${titleChunk}` : 'Magic Football'
  }
})
</script>