// Importo las funciones necesarias de vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Se importan los componentes que actuarán como páginas
import PaginaInicio from '../components/PaginaInicio.vue';
import PerfilUsuario from '../components/PerfilUsuario.vue';
import ListaDatos from '../components/ListaDatos.vue';
import DetalleOferta from '../components/DetalleOferta.vue';
import LugaresAlquiler from '../components/LugaresAlquiler.vue';
import DetalleAlquiler from '../components/DetalleAlquiler.vue';
import LugaresVenta from '../components/LugaresVenta.vue'; 
import DetallesVenta from '../components/DetallesVenta.vue';
import CrearListado from '../components/CrearListado.vue';

// Configuración de las rutas
const routes = [
  {
    path: '/',
    name: 'inicio',
    component: PaginaInicio
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilUsuario
  },
  {
    path: '/ofertas',
    name: 'Ofertas',
    component: ListaDatos
  },
  { path: '/ofertas/:id', 
    name: 'DetalleOferta', 
    component: DetalleOferta, 
    props: true 
  },
  { path: '/lugares-alquiler', 
    name: 'LugaresAlquiler', 
    component: LugaresAlquiler 
  },
  { path: '/alquiler/:id', 
    name: 'DetalleAlquiler', 
    component: DetalleAlquiler, 
    props: true 
  },
  {
    path: '/lugares-venta',
    name: 'LugaresVenta',
    component: LugaresVenta 
  },
  {
    path: '/detalles-venta/:id',
    name: 'DetallesVenta',
    component: DetallesVenta,
    props: true 
  },
  {
    path: '/crear-listado',
    name: 'CrearListado',
    component: CrearListado
  }
];

// Crear el router con la configuración de historial y rutas
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Exportar el router para su uso en la instancia principal de Vue
export default router;

