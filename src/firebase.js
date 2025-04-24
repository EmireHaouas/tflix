import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAiJ6mZCcm-v2tSRxQ31lbPyZiVoDPUWZ0",
    authDomain: "tflix-3fd5c.firebaseapp.com",
    projectId: "tflix-3fd5c",
    storageBucket: "tflix-3fd5c.firebasestorage.app",
    messagingSenderId: "456364782529",
    appId: "1:456364782529:web:79cdf7119125d1f872f540",
    measurementId: "G-ZP90XHJ4JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };