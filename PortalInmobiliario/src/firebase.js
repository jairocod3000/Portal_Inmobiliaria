// Importar las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Para Firestore
import { getAuth } from "firebase/auth";  // Para Authentication

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyCkhPSh3qQRVSCygu2RqCYxsv1N6yX5TIQ",
  authDomain: "portalinmobiliaria-960be.firebaseapp.com",
  projectId: "portalinmobiliaria-960be",
  storageBucket: "portalinmobiliaria-960be.appspot.com",
  messagingSenderId: "266206386321",
  appId: "1:266206386321:web:ed0914a7a0426a05798730",
  measurementId: "G-BG6NJ692QT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Firebase Authentication
const auth = getAuth(app);

// Exportar db y auth para ser usados en otros componentes de la aplicación
export { db, auth };

