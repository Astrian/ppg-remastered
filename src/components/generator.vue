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
const captialize = ref(false)

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

    let generatedPseudoword = ""
    if (randomwordlength.value) {
      generatedPseudoword = pseudoword(Math.floor(Math.random() * 6) + 3)
    } else {
      generatedPseudoword = pseudoword(wordlength.value)
    }
    if (captialize.value) {
      result += generatedPseudoword.charAt(0).toUpperCase() + generatedPseudoword.slice(1)
    } else {
      result += generatedPseudoword
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
        <input type="checkbox" id="captialize" v-model="captialize" @change="generate">
        <div class="mt-[-4px]">
          <label for="captialize" class="font-bold">{{ $t('message.generator_captialize_title') }}</label>
        </div>
      </div>

      <div class="flex gap-2 items-start">
        <input type="checkbox" id="randomwordlength" v-model="randomwordlength" @change="generate">
        <div class="mt-[-4px]">
          <label for="randomwordlength" class="font-bold">{{ $t('message.generator_floatinglength') }}</label>
          <div class="text-slate-500 dark:text-slate-400">{{ $t('message.generator_floatinglength_desc') }}</div>
        </div>
      </div>

      <div v-if="!randomwordlength">
        <label class="font-bold" for="randomwordlength">{{ $t('message.generator_pseudowordlength_title') }}</label>
        <input type="number" id="randomwordlength" v-model="wordlength" @change="generate" min="3" class="w-full shadow-inner border-2 border-slate-200 dark:bg-slate-600 dark:border-slate-500 p-2 rounded-md my-2 outline-none" />
        <div class="text-slate-500 dark:text-slate-400">{{$t("message.generator_pseudowordlength_helptext")}}</div>
      </div>

      <div>
        <label class="font-bold" for="wordcount">{{ $t('message.generator_passwordlength_title') }}</label>
        <input type="number" id="wordcount" v-model="wordcount" @change="generate" min="3" class="w-full shadow-inner border-2 border-slate-200 dark:bg-slate-600 dark:border-slate-500 p-2 rounded-md my-2 outline-none" />
        <div class="text-slate-500 dark:text-slate-400">{{$t("message.generator_passwordlength_helptext")}}</div>
      </div>

      <div>
        <div class="font-bold">{{ $t('message.generator_divider_title') }}</div>
        <select id="worddivider" v-model="worddivider" @change="generate" class="w-full shadow-inner border-2 border-slate-200 dark:bg-slate-600 dark:border-slate-500 p-2 rounded-md my-2 outline-none">
          <option :value="1">{{ $t('message.generator_divider_options_hyphen') }}</option>
          <option :value="2">{{ $t('message.generator_divider_options_dollarsign') }}</option>
          <option :value="3">{{ $t('message.generator_divider_options_numberzero') }}</option>
          <option :value="4">{{ $t('message.generator_divider_options_underline') }}</option>
          <option :value="0">{{ $t('message.generator_divider_options_custom') }}</option>
        </select>
      </div>

      <div v-if="worddivider === 0">
        <label class="font-bold" for="customdivider">{{ $t('message.generator_customdivider_title') }}</label>
        <input id="customdivider" v-model="customdivider" @change="generate" maxlength="1" class="w-full shadow-inner border-2 border-slate-200 dark:bg-slate-600 dark:border-slate-500 p-2 rounded-md my-2 outline-none" />
        <div class="text-slate-500 dark:text-slate-400">{{$t("message.generator_customdivider_helptext")}}</div>
      </div>
    </div>
  </div>

</template>