import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6EvxPEk0JKyJxdGxGfpmCgKZQ0uaokrY",
  authDomain: "web-dev-c4254.firebaseapp.com",
  databaseURL: "https://web-dev-c4254-default-rtdb.firebaseio.com",
  projectId: "web-dev-c4254",
  storageBucket: "web-dev-c4254.appspot.com",
  messagingSenderId: "551095461785",
  appId: "1:551095461785:web:742a3c626544a1f7a21508",
  measurementId: "G-6XG4GN4RGW",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getDatabase(app);
