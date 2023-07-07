import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAkKC1750dVOzyduv48br1djOJOUzaE5lk",
    authDomain: "tshop-data.firebaseapp.com",
    databaseURL: "https://tshop-data-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tshop-data",
    storageBucket: "tshop-data.appspot.com",
    messagingSenderId: "750724572274",
    appId: "1:750724572274:web:d74b1aaeac14c31342ceeb"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app); //db
  const storage = getStorage(app);

  export {app, firestore, storage}