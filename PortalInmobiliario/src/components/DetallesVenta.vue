<template>
    <div v-if="propiedad" class="detalles-venta">
      <h1>{{ propiedad.titulo }}</h1>
      <img :src="propiedad.imagen" :alt="propiedad.titulo" />
      <p>Precio: ${{ propiedad.precio }}</p>
      <p>Habitaciones: {{ propiedad.habitaciones }}</p>
      <p>Baños: {{ propiedad.baños }}</p>
      <p>Descripción: {{ propiedad.descripcion }}</p>
      <p>Dirección: {{ propiedad.direccion }}</p>
      <p>Tipo: {{ propiedad.tipo }}</p>
      <p>Superficie: {{ propiedad.superficie }} (m²)</p>
      <p>Estado: {{ propiedad.estado }}</p>
    </div>
    <div v-else>
      <p>Cargando detalles...</p>
    </div>
</template>
  
<script>
  import { db } from '@/firebase';
  import { doc, getDoc } from 'firebase/firestore';
  
  export default {
    props: ['id'],
    data() {
      return {
        propiedad: null
      };
    },
    async created() {
      const docRef = doc(db, "ColeccionVenta", this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.propiedad = docSnap.data();
      } else {
        console.error("No encontrado!");
      }
    }
  }
</script>
  
<style>
.detalles-venta {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra paraa dar profundidad */
    border-radius: 8px; 
    font-family: 'Arial', sans-serif; 
}

.detalles-venta h1 {
    font-size: 2em;
    color: #333; 
    margin-bottom: 20px;
}

.detalles-venta img {
    width: 100%; 
    height: auto;
    border-radius: 8px; 
    margin-bottom: 20px;
}

.detalles-venta p {
    font-size: 1.1em;
    line-height: 1.6; /* Espaciado de línea */
    margin-bottom: 10px; 
    color: #666; 
}

@media (max-width: 768px) {
    .detalles-venta {
        padding: 10px;
        margin: 20px;
    }

    .detalles-venta h1 {
        font-size: 1.5em;
    }
}
</style>

  
  