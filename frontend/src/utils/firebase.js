import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXb-JTK1LN06Z1Dlluj6bfwZNHQz_rR8o",
  authDomain: "devdex-819fa.firebaseapp.com",
  projectId: "devdex-819fa",
  storageBucket: "devdex-819fa.appspot.com",
  messagingSenderId: "340730580433",
  appId: "1:340730580433:web:4b5e36e90333ec132424f0",
  measurementId: "G-TBX3F93W27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, analytics, auth, firestore };