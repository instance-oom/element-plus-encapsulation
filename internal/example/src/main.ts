import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlusEncapsulation from '@instance-oom/element-plus-encapsulation'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(ElementPlusEncapsulation)
app.use(createPinia())
app.use(router)

app.mount('#app')