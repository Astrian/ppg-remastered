<script setup lang="ts">
import pseudoword from 'pseudoword'

import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

const generatedpassword = ref('password')
const wordcount = ref(4)
const worddivider = ref(1)
const customdivider = ref("")
const randomwordlength = ref(true)
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
    if (randomwordlength.value) {
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
    <div class="bg-amber-400 my-4 p-4 rounded-md text-amber-900" v-if="generatedpassword.length > 63">
      <div class="text-xl mb-2 font-bold">⚠️ {{$t("message.generoator_passwordtoolongalert_title")}}</div>
      <div>{{$t("message.generoator_passwordtoolongalert_msg")}}</div>
    </div>
    <div class="bg-amber-100 w-full mb-4 p-8 flex items-center justify-center rounded-lg font-mono text-xl text-black cursor-pointer text-center break-all" @click="copy">{{generatedpassword}}</div>
    <div class="flex justify-between items-center">
      <div class="text-slate-500 dark:text-slate-400">{{$t("message.generator_clicktocopy")}}</div>
      <button class="bg-cyan-500 text-white py-2 px-4 rounded-md" @click="generate">{{$t("message.generator_regenerate_btn")}}</button>
    </div>
  </div>

  <hr class="my-8" />

  <div>
    <div class="text-3xl uppercase font-bold">{{$t("message.generator_pref")}}</div>

    

    <div class="flex flex-col gap-6 mt-6">
      <div class="flex gap-2 items-start">
        <input type="checkbox" id="randomwordlength" v-model="randomwordlength" @change="generate">
        <div class="mt-[-4px]">
          <label for="randomwordlength" class="font-bold">{{ $t('message.generator_floatinglength') }}</label>
          <div class="text-slate-500 dark:text-slate-400">{{ $t('message.generator_floatinglength_desc') }}</div>
        </div>
      </div>

      <div v-if="!randomwordlength">
        <div class="font-bold">{{ $t('message.generator_pseudowordlength_title') }}</div>
        <input type="number" v-model="wordlength" @change="generate" min="3" class="w-full shadow-inner border-2 border-slate-200 dark:bg-slate-600 dark:border-slate-500 p-2 rounded-md my-2 outline-none" />
        <div class="text-slate-500 dark:text-slate-400">{{$t("message.generator_pseudowordlength_helptext")}}</div>
      </div>

      <div>
        <div class="font-bold">{{ $t('message.generator_passwordlength_title') }}</div>
        <input type="number" v-model="wordcount" @change="generate" min="3" class="w-full shadow-inner border-2 border-slate-200 dark:bg-slate-600 dark:border-slate-500 p-2 rounded-md my-2 outline-none" />
        <div class="text-slate-500 dark:text-slate-400">{{$t("message.generator_passwordlength_helptext")}}</div>
      </div>
    </div>
  </div>

</template>