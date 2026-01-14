// Firebase Configuration for SOS Click
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASMiQDsDhGItO80KRGE4ZXO85b84fCLUQ",
  authDomain: "sos-click-5960a.firebaseapp.com",
  projectId: "sos-click-5960a",
  storageBucket: "sos-click-5960a.firebasestorage.app",
  messagingSenderId: "638826058290",
  appId: "1:638826058290:web:dfc51c557e7dabcd7be22b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
