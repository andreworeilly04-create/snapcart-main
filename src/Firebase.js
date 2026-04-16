// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { signOut } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


export const saveUserCart = async (userId, cartItems) => {
  try {
    await setDoc(doc(db, "carts", userId), {
      items:cartItems,
      updatedAt: new Date()
    });

} catch (e){
  console.log("Error saving Cart: ", e);
}
};

export const getUserCart = async (userId) => {
  const docRef = doc(db, "carts", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()){
    return docSnap.data().items;
  } else {
    return [];

  }
};
  


const firebaseConfig = {
  apiKey: "AIzaSyBTlFKbHFh3_LO8ZfbrtFursbUlL8EzRe8",
  authDomain: "snapcart-117d8.firebaseapp.com",
  projectId: "snapcart-117d8",
  storageBucket: "snapcart-117d8.firebasestorage.app",
  messagingSenderId: "927278879326",
  appId: "1:927278879326:web:68301ef216df66fd1cdacf",
  measurementId: "G-HPE1M0YKLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email
      });

    return { success: true, user: user };

  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const loginUser = async (email, password) => {
  try {
   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return {success:true};
  } catch (error) {
    return {
      success: false, error: error.message };
    }
};

export const updateFirebaseCart = async (userId, newCart) => {

  if(!userId){
    console.error("No User ID provided to updateFirebaseCart");
    return;
  }
 
  try {
     const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      cart: newCart
    });
    console.log("Database updated");
  } catch (error) {
    console.error("Error updating database:", error);
  }
  
};

