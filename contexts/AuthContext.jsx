import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getAuthError, loginUser, logoutUser } from "../firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authStateReady, setAuthStateReady] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            }
          : null,
      );
      setAuthStateReady(true);
    });

    return () => unsub();
  }, []);

  async function login(credentials) {
    setStatus("submitting");
    setError(null);

    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      const error = getAuthError(err);
      setError(error);
      throw error;
    } finally {
      setStatus("idle");
    }
  }

  async function logout() {
    setStatus("submitting");
    setError(null);

    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      const error = getAuthError(err);
      setError(error);
      throw error;
    } finally {
      setStatus("idle");
    }
  }

  const value = {
    user,
    login,
    logout,
    status,
    error,
    authStateReady,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
