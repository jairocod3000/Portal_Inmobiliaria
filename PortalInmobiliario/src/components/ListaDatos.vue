<template>
  <div class="ofertas-body">
    <div class="lista-datos">
      <h1>Lista de Ofertas</h1>
      <div v-for="item in items" :key="item.id" class="oferta" @click="verDetalle(item.id)">
        <img :src="item.imagen" :alt="item.titulo" class="oferta-img" v-if="item.imagen">
        <h2>{{ item.titulo }}</h2>
        <p>{{ item.descripcion }}</p>
        <ul class="detalle-lista">
          <li>Precio: ${{ item.precio }}</li>
          <li>Habitaciones: {{ item.habitaciones }}</li>
          <li>Baños: {{ item.baños }}</li>
          <li>Tipo: {{ item.tipo }}</li>
          <li>Superficie: {{ item.superficie }} m²</li>
          <li>Dirección: {{ item.direccion }}</li>
          <li>Ciudad: {{ item.ciudad }}</li>
          <li>Estado: {{ item.estado }}</li>
          <li v-if="item.enOferta" class="en-oferta">¡En oferta!</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    verDetalle(id) {
      this.$router.push({ name: 'DetalleOferta', params: { id: id } });
    }
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "tuColeccion"));
    this.items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
</script>

<style>

.ofertas-body {
  background-color: #333;
}

.lista-datos {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f5f5f5; /* Fondo claro  */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Sombra sutil */
  border-radius: 8px; 
  font-family: 'Open Sans', sans-serif; 
  margin-bottom: -70px;
}

.oferta {
  border-bottom: 1px solid #eee; /* Línea más suave */
  padding-bottom: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease; /* Transición suave */
  cursor: pointer;
}

.oferta:hover {
  background-color: #fafafa; /* Resalta al pasar el ratón */
  transform: scale(1.02); /* Efecto de ligero zoom */
}

.oferta-img {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  margin-bottom: 10px;
  border-radius: 16px;
  box-shadow: 0 10px 6px 10px gray; /* Sombra para la imagen */
}

.detalle-lista {
  list-style: none; 
  padding: 0;
}

.detalle-lista li {
  margin-top: 5px;
  margin-bottom: 5px;
}

.en-oferta {
  color: #ff6347; 
  font-weight: bold;
}

h1 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: goldenrod;
  font-size: 2.5em;
}

h2 {
  color: #333; 
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}

p {
  color: #666; 
}
</style>

