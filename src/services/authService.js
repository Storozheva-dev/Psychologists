import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

// Реєстрація
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Вхід
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Вихід
export const logout = () => {
  return signOut(auth);
};
