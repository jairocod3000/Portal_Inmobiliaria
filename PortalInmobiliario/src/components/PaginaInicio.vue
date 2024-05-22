<template>
  <div class="home">
    <div v-if="propiedad" class="imagen-contenedor">
      <h1>Explorar</h1>
      <h2>Recomendado</h2>
      <div class="info-sobre-imagen">
        <h2 class="titulo-aleatorio">{{ propiedad.titulo }}</h2>
        <p class="precio-aleatorio">Precio: ${{ propiedad.precio }}</p>
      </div>
      <img :src="propiedad.imagen" :alt="propiedad.titulo" class="imagen-propiedad" @click="irADetalle(propiedad.id)" />
      <h2>Categorías</h2>
      <div class="imagenes-adicionales">
        <div class="categoria">
          <img src="../assets/imagenInicio1.jpg" alt="Lugares en alquiler" class="imagen-adicional" @click="irALugaresAlquiler">
          <h3>Lugares en alquiler</h3>
        </div>
        <div class="categoria">
          <img src="../assets/img-inicio2.jpg" alt="Lugares en venta" class="imagen-adicional" @click="irALugaresVenta">
          <h3>Lugares en venta</h3>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando propiedad...</p>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      propiedad: null
    };
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "tuColeccion"));
    const propiedades = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (propiedades.length > 0) {
      // Selecciona una imagen de las que tengo en oferta
      const randomIndex = Math.floor(Math.random() * propiedades.length);
      this.propiedad = propiedades[randomIndex];
    }
  },
  methods: {
    irADetalle(id) {
      this.$router.push({ name: 'DetalleOferta', params: { id } });
    },
    irALugaresAlquiler() {
    this.$router.push({ name: 'LugaresAlquiler' });
    },
    irALugaresVenta() {
      this.$router.push({ name: 'LugaresVenta' });
    }
  }
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 5%; /*Ajustado para responsividad*/
}

.imagen-propiedad {
  width: 100%;
  height: 450px;
  border-radius: 10px;
  cursor: pointer;
}

.info-sobre-imagen {
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.titulo-aleatorio, .precio-aleatorio {
  color: white;
}

.precio-aleatorio {
  font-size: 1.25em;
  font-weight: bold;
}

.imagenes-adicionales {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.categoria {
  width: 49%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.imagen-adicional {
  width: 100%;
  height: 400px;
  border-radius: 18px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .home {
    margin: 20px 2%;
  }

  .imagenes-adicionales {
    flex-direction: column;
  }

  .categoria {
    width: 100%; /* Full width on small screens */
    margin-top: 10px;
  }
}
</style>

