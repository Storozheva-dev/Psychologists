import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2nhos9x-VTZomobeiR10WeDS4UBXxhOQ",
  authDomain: "psychologists-84172.firebaseapp.com",
  databaseURL:
    "https://psychologists-84172-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "psychologists-84172",
  storageBucket: "psychologists-84172.firebasestorage.app",
  messagingSenderId: "936787879777",
  appId: "1:936787879777:web:b0fb554714d57dceb94720",
  measurementId: "G-E2VXV36WTS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
