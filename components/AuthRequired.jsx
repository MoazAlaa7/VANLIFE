import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function AuthRequired() {
  const location = useLocation();
  const { user, authStateReady } = useAuth();

  if (!authStateReady) return <h1>Loading...</h1>;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must be logged in to access that page.",
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
