import * as firebase from "firebase"; // old way, wont work anymore
// import firebase from "firebase/app";

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyA_PfqiZp81lR9jOMOlTs9vjhmjSK15xGo",
  authDomain: "ecommerce-b2991.firebaseapp.com",
  projectId: "ecommerce-b2991",
  storageBucket: "ecommerce-b2991.appspot.com",
  messagingSenderId: "454985159723",
  appId: "1:454985159723:web:e33307b11fc6ce2fed066e",
};

// initialize firebase app

firebase.initializeApp(config);

// export
export default firebase;
export const auth = firebase.auth();
// export const onAuthStateChanged = auth.onAuthStateChanged(user);

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
