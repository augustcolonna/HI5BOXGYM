import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyD40_U_KQ56euptwdNlvMppr3gExHtTS7k',
  authDomain: 'hi5-box-gym.firebaseapp.com',
  projectId: 'hi5-box-gym',
  storageBucket: 'hi5-box-gym.appspot.com',
  messagingSenderId: '477805389472',
  appId: '1:477805389472:web:ebe4d8935385dec4304bc5',
  measurementId: 'G-WR3NKPQXDW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const timestamp = serverTimestamp();
// const analytics = getAnalytics(app);
