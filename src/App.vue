<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://cdn.fonts.net/kit/${import.meta.env.VITE_MONOTYPE_CSS_TOKEN}.css`
    link.crossOrigin = 'anonymous'

    document.head.appendChild(link)
})
</script>

<template>
  <section class="w-full mx-4 lg:w-2/3 lg:mx-auto">
    <div class="my-6">
      <div class="text-4xl font-bold">Pseudo Password Generator</div>
      <div class="text-2xl">Remastered Version</div>
    </div>
    <hr />
  </section>
</template>