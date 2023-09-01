import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/base.less';
import { createPinia } from 'pinia';
const pinia = createPinia();

import OBSWebSocket from 'obs-websocket-js';
const obs = new OBSWebSocket().disconnect();

createApp(App).use(router).use(pinia).mount('#app');
