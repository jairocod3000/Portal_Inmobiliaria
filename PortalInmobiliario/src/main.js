// Importaciones necesarias de Vue y los componentes adicionales
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Crea la instancia de la aplicación de Vue
const app = createApp(App);

// Uso del router en la aplicación de Vue
app.use(router);

// Uso de store en la aplicación
app.use(store);

// Montar la aplicación Vue al DOM
app.mount('#app');

