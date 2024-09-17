<script setup lang="ts">
import pseudoword from 'pseudoword'

import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

const generatedpassword = ref('password')
const wordcount = ref(4)
const worddivider = ref(1)
const customdivider = ref("")
const randomwordlength = ref(0)
const wordlength = ref(5)

onMounted(() => {
  generate()
})

function generate() {
  let result = ""
  let divider = ["-", "$", "0", "_"]
  for (let i = 0; i < wordcount.value; i++) {
    if (i !== 0 ) {
      if (worddivider.value === 0) {
        result += customdivider.value
      } else {
        result += divider[worddivider.value - 1]
      }
    }
    if (randomwordlength.value === 0) {
      result += pseudoword(Math.floor(Math.random() * 6) + 3)
    } else {
      result += pseudoword(wordlength.value)
    }
  }
  generatedpassword.value = result
}

function copy() {
  navigator.clipboard.writeText(generatedpassword.value)
  alert(t("message.generator_copied"))
}
</script>

<template>
  <div>
    <div class="bg-amber-100 w-full my-4 p-8 flex items-center justify-center rounded-lg font-mono text-xl text-black cursor-pointer" @click="copy">{{generatedpassword}}</div>
    <div class="flex justify-between items-center">
      <div class="text-slate-500 dark:text-slate-400">{{$t("message.generator_clicktocopy")}}</div>
      <button class="bg-cyan-500 text-white py-2 px-4 rounded-md" @click="generate">{{$t("message.generator_regenerate_btn")}}</button>
    </div>
  </div>
</template>