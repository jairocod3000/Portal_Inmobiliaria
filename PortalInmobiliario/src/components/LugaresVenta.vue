<template>
    <div class="lugares-venta">
      <h1>Lugares en Venta</h1>
      <div v-for="venta in ventas" :key="venta.id" class="venta-item" @click="verDetalle(venta.id)">
        <img :src="venta.imagen" :alt="venta.titulo" class="imagen-venta"/>
        <div class="info-venta">
          <h2>{{ venta.titulo }}</h2>
          <p>Precio: ${{ venta.precio }}</p>
          <p>Habitaciones: {{ venta.habitaciones }}</p>
          <p>Baños: {{ venta.baños }}</p>
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
        ventas: []
      };
    },
    methods: {
        verDetalle(id) {
            if (id) {
                this.$router.push({ name: 'DetallesVenta', params: { id: id } });
            } else {
                console.error('ID de la propiedad no encontrado');
            }
        }
    },
    async created() {
      const querySnapshot = await getDocs(collection(db, "ColeccionVenta"));
      this.ventas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  }
</script>
  
<style>
.lugares-venta {
    width: 100%; /* que ocupe todo el ancho disponible */
    margin: auto; 
    padding: 20px;
}

.lugares-venta h1 {
    font-family: 'Arial', sans-serif; 
    font-weight: bold;
    font-size: 2em;
    color: #333; /* Color oscuro para el texto */
    text-align: center; 
    margin-bottom: 30px; /* Espacio debajo del título */
}

.venta-item {
    display: flex;
    flex-wrap: wrap; /* Permite que los elementos se adapten al tamaño de pantalla */
    align-items: center; 
    margin-bottom: 20px; 
    border-bottom: 1px solid #ccc; 
    padding-bottom: 20px; 
}

.imagen-venta {
    width: 100%; 
    max-width: 425px; 
    height: auto; 
    border-radius: 10px; 
    cursor: pointer;
}

.info-venta {
    flex-grow: 1; /* Toma el espacio restante */
    padding-left: 20px; /* Espacio a la izquierda para la separación */
}

@media (max-width: 768px) {
    .venta-item {
        flex-direction: column; /* Cambia a disposición vertical en pantallas pequeñas */
        align-items: center; /* Centra los elementos */
    }

    .imagen-venta {
        max-width: 100%; /* Imagen ocupa todo el ancho en dispositivos pequeños */
    }

    .info-venta {
        padding-left: 0; /* Elimina el padding en dispositivos pequeños */
        text-align: center; /* Centra el texto de detalles en dispositivos pequeños */
    }
}
</style>

  