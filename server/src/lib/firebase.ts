import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "../config";

const firebaseConfig = {
  apiKey: env.FIREBASE_APIKEY,
  authDomain: env.FIREBASE_AUTHDOMAIN,
  projectId: env.FIREBASE_PROJECTID,
  storageBucket: env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: env.FIREBASE_MESSAGINGSENDERID,
  appId: env.FIREBASE_APPID,
  measurementId: env.FIREBASE_MEASUREMENTID,
};

const app = initializeServerApp(firebaseConfig, {});
export const auth = getAuth(app);
