// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'; // Import getApp
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import other Firebase services like storage if needed

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only if it hasn't been initialized yet
let firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Export other initialized services if needed
// export const storage = getStorage(firebaseApp);

export default firebaseApp; // Optional: export the app instance itself