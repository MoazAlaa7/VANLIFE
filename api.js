import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "./firebase/firebase.js";

export { loginUser, logoutUser, getAuthError } from "./firebase/auth.js";

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
  const uid = auth.currentUser?.uid;
  if (!uid) {
    const error = new Error("Not authenticated");
    error.status = 401;
    throw error;
  }

  const q = query(collection(db, "vans"), where("hostId", "==", uid));

  const querySnapshot = await getDocs(q);
  const vans = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return vans;
}

export async function getHostVan(id) {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    const error = new Error("Not authenticated");
    error.status = 401;
    throw error;
  }

  const docRef = doc(db, "vans", id);
  const docSnap = await getDoc(docRef);
  const van = { ...docSnap.data(), id: docSnap.id };
  return van.hostId === uid ? van : null;
}
