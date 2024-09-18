<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n() 

import Generator from './components/generator.vue'

const localeSetting = ref(locale.value)

onMounted(() => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://cdn.fonts.net/kit/${import.meta.env.VITE_MONOTYPE_CSS_TOKEN}.css`
  link.crossOrigin = 'anonymous'

  document.head.appendChild(link)

  // load locale
  if (localStorage.getItem('locale')) {
    locale.value = localStorage.getItem('locale') as string
    localeSetting.value = locale.value
  } else {
    const browserLang = navigator.language.split('-')[0]
    locale.value = browserLang === 'zh' ? 'zh-CN' : browserLang
    localeSetting.value = "_auto"
  }
})

onUnmounted(() => {
  const link = document.querySelector('link')
  if (link) {
    document.head.removeChild(link)
  }
})

function changeLocale(event: Event) {
  if ((event.target as HTMLSelectElement).value === '_auto') {
    localStorage.removeItem('locale')
    const browserLang = navigator.language.split('-')[0]
    locale.value = browserLang === 'zh' ? 'zh-CN' : browserLang
  } else {
    localStorage.setItem('locale', (event.target as HTMLSelectElement).value)
    locale.value = (event.target as HTMLSelectElement).value
  }
}
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

    <div class="flex flex-col gap-0 mb-4">
      <div class="text-sm text-slate-500 dark:text-slate-400">Made by <a href="https://astrian.moe" target="_blank" class="text-slate-500 dark:text-slate-400 underline">Astrian</a></div>
      <div class="text-sm text-slate-500 dark:text-slate-400 flex">
        <div>Language / 語言 / 语言 / 言語</div>
        <select class="bg-slate-100 dark:bg-slate-600 rounded-md px-2 ml-2 outline-none" @change="changeLocale" v-model="localeSetting">
          <option value="_auto">Auto / 自動 / 自动 / オートメーション</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
          <option value="zh-CN">简体中文（中国大陆）</option>
          <option value="zh-TW">繁體中文（台灣地區）</option>
          <option value="yue">繁體中文（粵語口語）</option>
        </select>
      </div>
    </div>
  </section>
</template>