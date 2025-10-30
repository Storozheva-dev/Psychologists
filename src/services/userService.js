import { ref, set, update } from "firebase/database";
import { database } from "../firebase/config";

// Зберегти ім'я при реєстрації
export const saveUserName = async (userId, email, name) => {
  await set(ref(database, `users/${userId}`), {
    email: email,
    name: name,
  });
};
