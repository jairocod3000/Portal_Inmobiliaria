<template>
  <div class="registro-container">
    <h1 class="bienvenido" v-if="!userDetails">¡Bienvenido de nuevo!</h1>
    
    <!-- Formulario de registro -->
    <form @submit.prevent="register" class="registro-form" v-if="!userDetails && !isLogin">
      <h2 class="titulo-registro">Registro</h2>
      <input type="text" v-model="name" placeholder="Nombre" required>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Contraseña" required>
      <button type="submit" class="btn">Registrar</button>
    </form>

    <!-- Formulario de inicio de sesión -->
    <form @submit.prevent="login" class="registro-form" v-if="!userDetails && isLogin">
      <h2 class="titulo-inicio">Inicio de Sesión</h2>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Contraseña" required>
      <button type="submit" class="btn">Iniciar Sesión</button>
    </form>

    <!-- Botones de Google y cambio de modo -->
    <div v-if="!userDetails">
      <button @click="toggleLogin" class="btn toggle-btn">{{ isLogin ? 'Ir a Registro' : 'Ir a Inicio de Sesión' }}</button>
      <button @click="authenticateWithGoogle" class="btn google-btn">{{ isLogin ? 'Iniciar Sesión con Google' : 'Registrar con Google' }}</button>
    </div>

    <p v-if="message" :class="{'error-msg': isError}">{{ message }}</p>
    <p v-if="userDetails">Hola, {{ userDetails.displayName || userDetails.email }}</p>
    <button @click="signOut" class="btn sign-out-btn" v-if="userDetails">Cerrar Sesión</button>
    <!-- Este botón es para crear un listado -->
    <button @click="irACrearListado" class="btn" v-if="userDetails">Vender o alquilar tu casa</button>
    
    <div v-if="userDetails && listados.length > 0">
      <h2>Tus listados</h2>
      <div v-for="listado in listados" :key="listado.nombre" class="listado-item">
        <img :src="listado.imagen" alt="Imagen del listado" class="listado-imagen" >
        <div>
          <h3>{{ listado.nombre }}</h3>
          <p>{{ formatCurrency(listado.precioRegular) }}</p>
          <p>{{ listado.dormitorios }} dormitorios, {{ listado.baños }} baños</p>
          <!-- Botón para borrar el listado -->
          <button @click="borrarListado(listado.id)" class="btn-delete">Borrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, updateProfile } from "firebase/auth";

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      message: '',
      isError: false,
      isLogin: false
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
    listados() {
      return this.$store.getters.getListados;
    }
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(userCredential => {
          updateProfile(userCredential.user, {
            displayName: this.name
          }).then(() => {
            this.$store.commit('setUserDetails', {
              displayName: this.name,
              email: this.email
            });
            this.message = `Registro exitoso. Bienvenido, ${this.name}!`;
            this.isError = false;
          });
        })
        .catch(error => {
          this.message = error.message;
          this.isError = true;
        });
    },
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(userCredential => {
          this.$store.commit('setUserDetails', userCredential.user);
          this.message = 'Inicio de sesión exitoso';
          this.isError = false;
        })
        .catch(error => {
          this.message = error.message;
          this.isError = true;
        });
    },
    authenticateWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(result => {
          this.$store.commit('setUserDetails', result.user);
          this.message = 'Autenticación con Google exitosa';
          this.isError = false;
        })
        .catch(error => {
          this.message = error.message;
          this.isError = true;
        });
    },
    signOut() {
      signOut(auth)
        .then(() => {
          this.$store.commit('setUserDetails', null);
          this.message = 'Has cerrado sesión exitosamente.';
          this.isError = false;
        });
    },
    toggleLogin() {
      this.isLogin = !this.isLogin;
    },
    irACrearListado() {
      this.$router.push({ name: 'CrearListado' });
    },
    formatCurrency(value) {
      // Esto formatea el número como moneda
      return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
    },
    borrarListado(id) {
      if (confirm("¿Estás seguro que quieres eliminar este listado?")) {
        this.$store.dispatch('borrarListado', id);
      }
    }
  }
}
</script>

<style>
.registro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #333; /* Fondo oscuro */
  color: #fff; 
  font-family: 'Roboto', sans-serif; 
  padding: 20px;
  margin-bottom: -60px
}

.bienvenido{
  color: white;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}

.titulo-registro, .titulo-inicio{
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.registro-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #555; /* Borde más sutil para el tema oscuro */
  background-color: #222; /* Fondo de entrada más oscuro */
  color: #ddd; /* Color de texto más claro para las entradas */
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50; /* Mantener el verde para acciones positivas */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px
}

.btn:hover {
  background-color: #45a049;
}

.google-btn {
  background-color: #dd4b39;
  margin-top: 10px;
}

.google-btn:hover {
  background-color: #c23321;
}

.error-msg {
  color: red;
}

.sign-out-btn {
  background-color: #f44336; /* Color rojo para el botón de cerrar sesión */
}
.sign-out-btn:hover {
  background-color: #d32f2f;
}

.toggle-btn {
  margin-top: 10px;
  background-color: #555;
}
.toggle-btn:hover {
  background-color: #666;
}

.listado-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.listado-imagen {
  width: 420px;
  height: 200px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 18px;
  cursor: pointer;
}

.btn-delete {
  font-family: 'Roboto', sans-serif; 
  border-radius: 10px;
  padding: 5px;
}

</style>


  