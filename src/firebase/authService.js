// src/firebase/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

// Регістрація з ім'ям
export const registerWithEmail = async (name, email, password) => {
  // створюємо юзера + автоматично логінимо
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // тут уже має бути auth.currentUser
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    // ОБОВʼЯЗКОВО: оновити локальний обʼєкт
    await auth.currentUser.reload();

    return auth.currentUser; // тут вже має бути displayName
  }

  return userCredential.user; // fallback, але сюди краще не доходити
};

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // на всякий випадок підтягуємо свіжі дані
  if (auth.currentUser) {
    await auth.currentUser.reload();
    return auth.currentUser;
  }

  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};
