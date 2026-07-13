import FIREBASE_CONF from "../DB_CONF";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const app = initializeApp(FIREBASE_CONF);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
