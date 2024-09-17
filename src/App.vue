<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import Generator from './components/generator.vue';

onMounted(() => {
  const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://cdn.fonts.net/kit/${import.meta.env.VITE_MONOTYPE_CSS_TOKEN}.css`
    link.crossOrigin = 'anonymous'

    document.head.appendChild(link)
})

onUnmounted(() => {
  const link = document.querySelector('link')
  if (link) {
    document.head.removeChild(link)
  }
})
</script>

<template>
  <section class="w-full px-4 lg:w-2/3 lg:mx-auto lg:px-0">
    <div class="my-6 flex flex-col gap-2">
      <div class="text-4xl font-bold">{{ $t('message.appname') }}</div>
      <div class="text-2xl">{{ $t('message.appname_second') }}</div>
    </div>
    <hr />
    <Generator />
  </section>
</template>