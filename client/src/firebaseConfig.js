import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBms0IctEUWyzhcCGn2pTLSPIzXghNbaSU",
    authDomain: "academify-a4584.firebaseapp.com",
    projectId: "academify-a4584",
    storageBucket: "academify-a4584.appspot.com",
    messagingSenderId: "641606776648",
    appId: "1:641606776648:web:ed4cb3fec7b379c6e9e57d",
    measurementId: "G-SLFH0P21J4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
