// import {API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSEGE_SENDER_ID,APP_ID} from "@env"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.API_KEY,
  authDomain:process.env.AUTH_DOMAIN,
  projectId:process.env.PROJECT_ID,
  storageBucket:process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSEGE_SENDER_ID,
  appId:process.env.APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);