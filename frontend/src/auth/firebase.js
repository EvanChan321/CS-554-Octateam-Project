import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDUdAzxBrxMpAVk4_gdTuwiuAvgQMgDaz0",
    authDomain: "game-share-c7aff.firebaseapp.com",
    projectId: "game-share-c7aff",
    storageBucket: "game-share-c7aff.firebasestorage.app",
    messagingSenderId: "600822736548",
    appId: "1:600822736548:web:b294d8c1e8fd9007542831"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
