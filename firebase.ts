import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyAt7hnOtCOAjp7ZTDZ8mjylmfFw9Jm8EqA",
    authDomain: "sass-translator-app-1ae31.firebaseapp.com",
    projectId: "sass-translator-app-1ae31",
    storageBucket: "sass-translator-app-1ae31.appspot.com",
    messagingSenderId: "833415098696",
    appId: "1:833415098696:web:9620e5c78854d4a2c1837d",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
