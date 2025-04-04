import { getApps, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_APP_ID, EXPO_PUBLIC_AUTH_DOMAIN, EXPO_PUBLIC_MEASUREMENT_ID, EXPO_PUBLIC_MESSAGING_SENDER_ID, EXPO_PUBLIC_PROJECT_ID, EXPO_PUBLIC_STORAGE_BUCKET} from "@env";

const firebaseConfig = {
    apiKey:process.env.EXPO_PUBLIC_API_KEY,
    authDomain:process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId:process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket:process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId:process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId:process.env.EXPO_PUBLIC_APP_ID,
    measurementId:process.env.EXPO_PUBLIC_MEASUREMENT_ID
  };
  
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  const storage = getStorage(app);
  
  
  export { auth, storage };