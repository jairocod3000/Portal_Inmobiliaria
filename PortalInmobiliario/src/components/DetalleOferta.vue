<template>
  <div v-if="oferta" class="detalle-oferta">
    <img :src="oferta.imagen" :alt="oferta.titulo" class="detalle-oferta-img"/>
    <div class="contenido">
      <h1>{{ oferta.titulo }}</h1>
      <p>{{ oferta.descripcion }}</p>
      <ul>
        <li>Precio: {{ oferta.precio }}</li>
        <li class="descuento">Descuento: {{ oferta.descuento }}</li>
        <li>Habitaciones: {{ oferta.habitaciones }}</li>
        <li>Baños: {{ oferta.baños }}</li>
        <li>Superficie: {{ oferta.superficie }} m²</li>
        <li>Dirección: {{ oferta.direccion }}</li>
        <li>Ciudad: {{ oferta.ciudad }}</li>
        <li>Estado: {{ oferta.estado }}</li>
      </ul>
      <span v-if="oferta.enOferta" class="en-oferta">¡En oferta!</span>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default {
  props: {
    id: String
  },
  data() {
    return {
      oferta: null
    };
  },
  filters: {
    currencyFormat(value) {
      return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
    }
  },
  async created() {
    const docRef = doc(db, "tuColeccion", this.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.oferta = docSnap.data();
    } else {
      console.log("No such document!");
    }
  }
}
</script>

<style>
.detalle-oferta {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
}

.detalle-oferta-img {
  width: 100%;
  height: 700px;
  border-radius: 8px;
  cursor: pointer;
}

.contenido {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #333;
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

.en-oferta {
  color: #ff6347;
  font-weight: bold;
  margin-top: 10px;
}

.descuento {
  background-color: #333;
  color: white;
  border-radius: 12px;
  padding: 5px;
}

</style>

  