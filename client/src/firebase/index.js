// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNsrMz2k9AGEPgtt1bGgfJxWaVioefW0M",
  authDomain: "genial-wine.firebaseapp.com",
  projectId: "genial-wine",
  storageBucket: "genial-wine.appspot.com",
  messagingSenderId: "289085683226",
  appId: "1:289085683226:web:a08fcba7e75d4c6975c3a3",
  measurementId: "G-W6Z60K6FMP"
};

// Initialize Firebase
export const initiFirestore = initializeApp(firebaseConfig);
export const auth = getAuth(initiFirestore);
export const db = getFirestore(initiFirestore);
