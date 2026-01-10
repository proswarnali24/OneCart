import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "onecartlogin-53a75.firebaseapp.com",
  projectId: "onecartlogin-53a75",
  storageBucket: "onecartlogin-53a75.firebasestorage.app",
  messagingSenderId: "1075733983146",
  appId: "1:1075733983146:web:6f147690aa598b5a9b85d3"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

