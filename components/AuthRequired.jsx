import { Outlet, Navigate, useLocation } from "react-router";

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem("loggedin");
  const location = useLocation();

  if (!isLoggedIn) {
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
