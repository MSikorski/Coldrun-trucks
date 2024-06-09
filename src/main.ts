import 'primevue/resources/themes/aura-light-blue/theme.css';
import 'primeicons/primeicons.css';
import './assets/tailwind.css';

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import store from './store';
import router from './router';

const app = createApp(App);
app.use(PrimeVue);
app.use(store);
app.use(router);

app.mount('#app');
