<template>
  <div id="app">
    <router-view/>
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-link left-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
          Inicio
        </router-link>
        <router-link to="/ofertas" class="nav-link center-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg>
          Ofertas
        </router-link>
        <router-link to="/perfil" class="nav-link right-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
          Perfil
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style>
/* Reset básico para links */
a {
  color: inherit;
  text-decoration: none;
}

svg {
  width: 25px;
  margin-bottom: 5px; /* Espacio entre el ícono y el texto */
}

/* Estilos de la barra de navegación */
.navbar {
  background-color: #333; /* Color de fondo oscuro */
  padding: 10px 20px; /* Espaciado interno */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Fuente elegante y moderna */
  position: fixed; /* Fija la barra de navegación en la parte inferior */
  bottom: 0; /* Alinea la barra en la parte inferior */
  width: 100%; /* Asegura que ocupe todo el ancho */
  box-shadow: 0 -2px 4px rgba(0,0,0,0.5); /* Sombra sutil para dar profundidad */
  z-index: 1000; /* Asegura que la barra esté siempre visible sobre otros elementos */
  display: flex; /* Habilita flexbox */
  justify-content: center; /* Centra los elementos horizontalmente */
}

.nav-container {
  display: flex; /* Asegura que los enlaces estén en línea y sean flexibles */
  width: 100%;
}

.nav-link {
  flex: 1; /* Divide el espacio de manera igual entre los enlaces */
  color: #fff; /* Color de texto claro */
  text-align: center; /* Alineación de texto */
  font-size: 16px; /* Tamaño de fuente legible */
  font-weight: bold; /* Fuente en negrita */
  display: flex; /* Flex para permitir la orientación vertical del contenido */
  flex-direction: column; /* Orienta los hijos en columna */
  align-items: center; /* Centra los hijos horizontalmente */
  justify-content: center; /* Centra los hijos verticalmente */
}

.nav-link:hover {
  color: #4CAF50; /* Cambio de color al pasar el ratón */
}

.left-link {
  justify-content: flex-start; /* Alinea el enlace de inicio a la izquierda */
}

.center-link {
  justify-content: center; /* Centra el enlace de ofertas */
}

.right-link {
  justify-content: flex-end; /* Alinea el enlace de perfil a la derecha */
}

#app {
  padding-bottom: 60px; /* Espacio en la parte inferior para evitar que el contenido se solape con la barra de navegación */
}
</style>

