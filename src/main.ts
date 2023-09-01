import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/base.less';

import OBSWebSocket from 'obs-websocket-js';
const obs = new OBSWebSocket();
obs.disconnect();

createApp(App).use(router).mount('#app');
