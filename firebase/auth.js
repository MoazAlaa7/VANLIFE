import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase";

function mapAuthError(error) {
  switch (error?.code) {
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "The email or password you entered is incorrect.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/network-request-failed":
      return "We couldn't reach the network. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many sign-in attempts. Please wait a moment before trying again.";
    default:
      return "We couldn't sign you in. Please try again.";
  }
}

export async function loginUser({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = cred.user;

  const userDocRef = doc(db, "users", firebaseUser.uid);
  const userSnap = await getDoc(userDocRef);

  let user;
  if (userSnap.exists()) {
    user = { ...userSnap.data(), id: userSnap.id };
  } else {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const [userDoc] = querySnapshot.docs;
      user = { ...userDoc.data(), id: userDoc.id };
    } else {
      user = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || null,
      };
    }
  }

  return {
    user,
  };
}

export async function logoutUser() {
  await signOut(auth);
}

export function getAuthError(error) {
  const errorMessage = mapAuthError(error);
  const newError = new Error(errorMessage);
  newError.code = error?.code;
  newError.cause = error;
  return newError;
}
