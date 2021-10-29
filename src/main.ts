import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerComponent, setRem } from './global';
import '@/assets/style/basic.scss';

const app = createApp(App);
app
    .use(setRem)
    .use(registerComponent)
    .use(store)
    .use(router)
    .mount('#app');
