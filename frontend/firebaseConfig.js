import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Only if using Firestore
import { getAnalytics } from 'firebase/analytics'; // Only if using Analytics

const firebaseConfig = {
  apiKey: 'AIzaSyDtN86v7IyT-Qk9IdxzWrvZ4U9qk4itS6M',
  authDomain: 'soundwave-f237a.firebaseapp.com',
  projectId: 'soundwave-f237a',
  storageBucket: 'soundwave-f237a.appspot.com',
  messagingSenderId: '391535664840',
  appId: '1:391535664840:web:cddde7404c844e4ee30ffd',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
// const db = getFirestore(app); // Uncomment if you're using Firestore
const analytics = getAnalytics(app);

export { app, auth, analytics }; // Export the app and services as needed
