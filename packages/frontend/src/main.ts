import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Template components
import BaseBlock from '@/components/BaseBlock/index.vue'
import BasePageHeading from '@/components/BasePageHeading/index.vue'

// Bootstrap framework
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap

const app = createApp(App)

// Register global components
app.component('BaseBlock', BaseBlock)
app.component('BasePageHeading', BasePageHeading)

app.use(createPinia())
app.use(router)

app.mount('#app')
