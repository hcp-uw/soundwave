// import { initializeApp, initializeAuth } from "firebase/app";
// //import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// import { getReactNativePersistence } from "firebase/auth/react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: 'AIzaSyDtN86v7IyT-Qk9IdxzWrvZ4U9qk4itS6M',
//   authDomain: 'soundwave-f237a.firebaseapp.com',
//   projectId: 'soundwave-f237a',
//   storageBucket: 'soundwave-f237a.appspot.com',
//   messagingSenderId: '391535664840',
//   appId: '1:391535664840:web:cddde7404c844e4ee30ffd',
// };

// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// // const db = getFirestore(app); // Uncomment if you're using Firestore
// const analytics = getAnalytics(app);

// export {auth};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyDtN86v7IyT-Qk9IdxzWrvZ4U9qk4itS6M',
  authDomain: 'soundwave-f237a.firebaseapp.com',
  projectId: 'soundwave-f237a',
  storageBucket: 'soundwave-f237a.appspot.com',
  messagingSenderId: '391535664840',
  appId: '1:391535664840:web:cddde7404c844e4ee30ffd',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Works in Expo Go

export { auth };
