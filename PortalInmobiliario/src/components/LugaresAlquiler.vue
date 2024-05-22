<template>
  <div class="lugares-alquiler">
    <h1>Lugares en Alquiler</h1>
    <div v-for="alquiler in alquileres" :key="alquiler.id" class="propiedad-contenedor" @click="verDetalle(alquiler.id)">
      <div class="propiedad-imagen">
        <img :src="alquiler.imagen" :alt="alquiler.titulo" />
      </div>
      <div class="propiedad-detalles">
        <h2>{{ alquiler.titulo }}</h2>
        <p>Precio: ${{ alquiler.precio }}</p>
        <p>Habitaciones: {{ alquiler.habitaciones }}</p>
        <p>Baños: {{ alquiler.baños }}</p>
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
        alquileres: []
      };
    },
    async created() {
      const querySnapshot = await getDocs(collection(db, "ColeccionAlquiler"));
      this.alquileres = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    methods: {
    verDetalle(id) {
      this.$router.push({ name: 'DetalleAlquiler', params: { id } });
    }
  }
  }
</script>
  
<style>
.lugares-alquiler {
  width: 100%; 
  padding: 20px; 
  margin: auto; /* Centra el contenido */
}

.lugares-alquiler h1 {
  font-family: 'Arial', sans-serif; 
  font-weight: bold;
  font-size: 2em;
  color: #333; 
  text-align: center; 
  margin-bottom: 30px; /* Espacio debajo del título */
}

.propiedad-contenedor {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan en la siguiente línea en pantallas pequeñas */
  align-items: center; 
  margin-bottom: 20px; 
  border-bottom: 1px solid #ccc; /* Añade una línea para separar cada propiedad */
  padding-bottom: 20px; /* Pongo espaciado pra al final de cada propiedad */
}

.propiedad-imagen img {
  width: 100%;
  max-width: 425px; /* Tamaño máximo de la imagen */
  height: auto;
  border-radius: 10px; 
  cursor: pointer;
}

.propiedad-detalles {
  flex-grow: 1;
  padding-left: 20px; /* Espacio a la izquierda de los detalles */
}

.propiedad-detalles h2 {
  font-size: 1.5em;
  color: #444; 
}

.propiedad-detalles p {
  font-size: 1em;
  color: #666; 
}

@media (max-width: 768px) {
  .propiedad-contenedor {
    flex-direction: column; /* Cambia a disposición vertical en dispositivos pequeños */
    align-items: flex-start;
  }

  .propiedad-imagen img {
    max-width: 100%; /* Imagen ocupa todo el ancho en dispositivos pequeños */
  }

  .propiedad-detalles {
    padding-left: 0; /* Elimina el padding en dispositivos pequeños */
    text-align: center; /* Centra el texto de detalles en dispositivos pequeños */
    padding-top: 10px; /* Espacio adicional en la parte superior */
  }
}
</style>
