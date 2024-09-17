import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n_strings from './utilities/i18n.json'

console.log(i18n_strings)

const i18n = createI18n({
  locale: navigator.language || 'en',
  fallbackLocale: 'en',
  messages: i18n_strings
})

createApp(App).use(i18n).mount('#app')
