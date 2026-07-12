import FIREBASE_CONF from "./DB_CONF";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

const app = initializeApp(FIREBASE_CONF);
const db = getFirestore(app);

export async function getVans() {
  const querySnapshot = await getDocs(collection(db, "vans"));
  const vans = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const docSnap = await getDoc(docRef);
  const van = { ...docSnap.data(), id: docSnap.id };
  return van;
}

export async function getHostVans() {
  const q = query(collection(db, "vans"), where("hostId", "==", "123"));

  const querySnapshot = await getDocs(q);
  const vans = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return vans;
}

export async function getHostVan(id) {
  const docRef = doc(db, "vans", id);
  const docSnap = await getDoc(docRef);
  const van = { ...docSnap.data(), id: docSnap.id };
  return van.hostId === "123" ? van : null;
}

export async function loginUser({ email, password }) {
  const q = query(
    collection(db, "users"),
    where("email", "==", email),
    where("password", "==", password),
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    const error = new Error("No user with those credentials found!");
    error.status = 401;
    throw error;
  }

  const [userDoc] = querySnapshot.docs;
  const user = { ...userDoc.data(), id: userDoc.id };
  // Security 😎
  delete user.password;

  return {
    user,
    token: "firebase-login-token",
  };
}
