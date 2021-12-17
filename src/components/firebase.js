import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD50Udmsx4D2i38iaCTEK2PSlkMH4TGqkk",
  authDomain: "social-3e83c.firebaseapp.com",
  projectId: "social-3e83c",
  storageBucket: "social-3e83c.appspot.com",
  messagingSenderId: "479315136344",
  appId: "1:479315136344:web:7b9f713064a7e5eaccdf2d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
