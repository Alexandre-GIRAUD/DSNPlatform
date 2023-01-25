
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, doc, updateDoc, collection, addDoc } from "firebase/firestore";

/* const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})
 */
const app = firebase.initializeApp({
  apiKey: "AIzaSyB1OumD455YTQf5OBe0kLnBi_Tu6jokXws",
  authDomain: "dsn-dev-01.firebaseapp.com",
  projectId: "dsn-dev-01",
  storageBucket: "dsn-dev-01.appspot.com",
  messagingSenderId: "1091973847397",
  appId: "1:1091973847397:web:f273e34a7ea6239ec2698c"
})

export const auth = app.auth()
export default app


export const firestore = getFirestore();

export function updateUser(userid, docData) {
  try {
    const docRef = addDoc(doc(firestore, "users"), docData)
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

