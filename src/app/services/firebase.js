// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW3P-lwfOlgIkVyM99YftgZ3WXkbtz90Y",
  authDomain: "pokedex-13e7f.firebaseapp.com",
  projectId: "pokedex-13e7f",
  storageBucket: "pokedex-13e7f.appspot.com",
  messagingSenderId: "428883923441",
  appId: "1:428883923441:web:d2a0c624226055967f3450",
  measurementId: "G-KTL073YRKQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
