<template>
    <div class="detalle-alquiler">
      <h1>{{ propiedad.titulo }}</h1>
      <img :src="propiedad.imagen" :alt="propiedad.titulo" />
      <p>Precio: ${{ propiedad.precio }}</p>
      <p>Habitaciones: {{ propiedad.habitaciones }}</p>
      <p>Baños: {{ propiedad.baños }}</p>
      <p>Descripcion: {{ propiedad.descripcion }}</p>
      <p>Direccion: {{ propiedad.direccion }}</p>
      <p>Tipo: {{ propiedad.tipo }}</p>
      <p>Superficie: {{ propiedad.superficie }} (m²)</p>
      <p>Estado: {{ propiedad.estado }}</p>
    </div>
</template>
  
<script>
  import { db } from '@/firebase';
  import { doc, getDoc } from 'firebase/firestore';
  
  export default {
    props: ['id'],
    data() {
      return {
        propiedad: {}
      };
    },
    async created() {
      const docRef = doc(db, "ColeccionAlquiler", this.id);
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
.detalle-alquiler {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.detalle-alquiler h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.detalle-alquiler img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.detalle-alquiler p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .detalle-alquiler {
    margin: 20px;
    padding: 10px;
  }

  .detalle-alquiler h1 {
    font-size: 20px;
  }

  .detalle-alquiler p {
    font-size: 14px;
  }
}
</style>

  