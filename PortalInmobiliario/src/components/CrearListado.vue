<template>
  <div class="listado-main">
    <div class="listado-container">
      <h1>Crear un listado</h1>
      <form @submit.prevent="submitForm" class="listado-form">
        <div class="toggle-buttons">
            <label for="vender-alquilar">Vender/Alquilar</label><br>
          <button type="button" :class="{active: tipo === 'vender'}" @click="tipo = 'vender'">Vender</button>
          <button type="button" :class="{active: tipo === 'alquilar'}" @click="tipo = 'alquilar'">Alquilar</button>
        </div>
        
        <label for="nombre">Nombre:</label><br>
        <input type="text" v-model="nombre" placeholder="Nombre" required>
  
        <div class="input-group">
          <label for="dormitorios">Dormitorios:</label>
          <input type="number" v-model.number="dormitorios" placeholder="Dormitorios" min="1" max="10" required>
          <label for="baños">Baños:</label>
          <input type="number" v-model.number="baños" placeholder="Baños" min="1" max="8" required>
        </div>
  
        <div class="toggle-buttons">
          <label for="estacionamiento">Estacionamiento:</label>
          <button type="button" :class="{active: estacionamiento === true}" @click="estacionamiento = true">Sí</button>
          <button type="button" :class="{active: estacionamiento === false}" @click="estacionamiento = false">No</button>
        </div>
  
        <div class="toggle-buttons">
          <label for="amueblado">Amueblado:</label>
          <button type="button" :class="{active: amueblado === true}" @click="amueblado = true">Sí</button>
          <button type="button" :class="{active: amueblado === false}" @click="amueblado = false">No</button>
        </div>
        
        <label for="direccion">Dirección:</label><br>
        <input type="text" v-model="direccion" placeholder="Dirección" required>
  
        <div class="toggle-buttons">
          <label for="oferta">Oferta:</label>
          <button type="button" :class="{active: oferta === true}" @click="oferta = true">Sí</button>
          <button type="button" :class="{active: oferta === false}" @click="oferta = false">No</button>
        </div>
        
        <label for="precio">Precio Venta o Precio Alquiler/mes:</label><br>
        <input type="number" v-model.number="precioRegular" placeholder="Precio regular" min="50" required><br>
        
        <label for="imagenes">Imágenes:</label><br>
        <input type="file" ref="files" multiple @change="handleFileUpload" required />
        <button type="submit" class="btn-submit">Crear listado</button>
      </form>
    </div>
  </div> 
</template>
  
<script>
export default {
  data() {
    return {
      tipo: 'vender',
      nombre: '',
      dormitorios: 1,
      baños: 1,
      estacionamiento: false,
      amueblado: false,
      direccion: '',
      oferta: false,
      precioRegular: 0,
      archivos: []
    };
  },
  methods: {
    submitForm() {
      const listado = {
        tipo: this.tipo,
        nombre: this.nombre,
        dormitorios: this.dormitorios,
        baños: this.baños,
        estacionamiento: this.estacionamiento,
        amueblado: this.amueblado,
        direccion: this.direccion,
        oferta: this.oferta,
        precioRegular: this.precioRegular,
        //manejar las imágenes 
        imagen: URL.createObjectURL(this.archivos[0])
      };
      this.$store.dispatch('createListado', listado);
      this.$router.push('/perfil'); // La ruta del perfil es '/perfil'
    },
    handleFileUpload(event) {
      this.archivos = Array.from(event.target.files);
    }
  }
}
</script>

  
<style>

.listado-main {
  background-image: url("../assets/fondo-listados.jpg");
}

.listado-container {
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 18px;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color:cadetblue; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); /* Sombra sutil para profundidad */
  border-radius: 8px; 
  margin-bottom: -55px;
}

.input-group {
  display: flex;
  flex-direction: column; /* Alineación vertical para que se pueda ver mejor */
  gap: 10px; /* Espaciado consistente entre inputs */
}

.toggle-buttons {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px; 
}

.toggle-buttons button {
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s; /* Transición suave al cambiar estados */
  border-radius: 8px;
}

.toggle-buttons button.active,
.toggle-buttons button:hover {
  background-color: red; 
}

.btn-submit {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  border-radius: 5px; /* Botón redondeado */
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

@media (max-width: 768px) {
  .listado-container {
    padding: 15px; /* Menos padding en dispositivos pequeños */
  }

  .input-group, .toggle-buttons {
    flex-direction: column; /* Asegura que todo se apila verticalmente en pantallas pequeñas */
  }

  .btn-submit {
    padding: 10px 15px; /* Ajuste de padding para botones en dispositivos móviles */
  }
}
</style>

  
  