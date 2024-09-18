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
    <div class="mt-6 flex flex-col gap-2">
      <div class="text-4xl font-bold">{{ $t('message.appname') }}</div>
      <div class="text-2xl">{{ $t('message.appname_second') }}</div>
    </div>

    <hr class="my-8" />

    <Generator />

    <hr class="my-8" />
    
    <div>
      <div class="text-3xl uppercase font-bold mb-4">{{$t("message.notes_title")}}</div>
      <div class="flex flex-col gap-4" v-html="$t('message.notes_body')" />
    </div>

    <hr class="my-8" />

    <div class="mb-4 text-sm text-slate-500 dark:text-slate-400">Made by <a href="https://astrian.moe" target="_blank" class="text-slate-500 dark:text-slate-400 underline">Astrian</a></div>
  </section>
</template>