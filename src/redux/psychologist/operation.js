// src/redux/psychologist/operation.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/config";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const snap = await get(ref(database, "psychologists"));
      if (!snap.exists()) return [];

      const raw = snap.val();

      if (Array.isArray(raw)) {
        return raw
          .filter(Boolean)
          .map((item, idx) => ({ id: String(idx), ...item }));
      }

      if (raw && typeof raw === "object") {
        return Object.entries(raw).map(([id, v]) => ({ id, ...v }));
      }

      return [];
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || "Firebase error");
    }
  }
);
