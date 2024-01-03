// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDINx-PL9dWdKIwzO-Wh6aUN8BFOZrlVZw",
  authDomain: "josiah-world-a69ae.firebaseapp.com",
  projectId: "josiah-world-a69ae",
  storageBucket: "josiah-world-a69ae.appspot.com",
  messagingSenderId: "176030065204",
  appId: "1:176030065204:web:9a03c724fcc435d0cb6061"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const store = getStorage(app)