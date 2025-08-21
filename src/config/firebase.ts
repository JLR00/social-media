// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBwiVwMFiMOOMHD4cDgdP5cSSWrRNftlY",
    authDomain: "social-media-project-4454a.firebaseapp.com",
    projectId: "social-media-project-4454a",
    storageBucket: "social-media-project-4454a.firebasestorage.app",
    messagingSenderId: "697345101645",
    appId: "1:697345101645:web:cb99a507f256ccf2bb7104"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();