import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Only necessary imports
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const firebaseConfig = {
    apiKey: "AIzaSyDtN86v7IyT-Qk9IdxzWrvZ4U9qk4itS6M",
    authDomain: "soundwave-f237a.firebaseapp.com",
    projectId: "soundwave-f237a",
    storageBucket: "soundwave-f237a.firebasestorage.app",
    messagingSenderId: "391535664840",
    appId: "1:391535664840:web:cddde7404c844e4ee30ffd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)  // Set persistence to AsyncStorage
});

export { auth };



// import { initializeApp } from "firebase/app";
// //import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//     apiKey: "AIzaSyDtN86v7IyT-Qk9IdxzWrvZ4U9qk4itS6M",
//     authDomain: "soundwave-f237a.firebaseapp.com",
//     projectId: "soundwave-f237a",
//     storageBucket: "soundwave-f237a.firebasestorage.app",
//     messagingSenderId: "391535664840",
//     appId: "1:391535664840:web:cddde7404c844e4ee30ffd",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const db = getFirestore(app);
// const auth = getAuth(app);

// export { auth };
