import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { loginUser } from "../api";
import logoutImageUrl from "/assets/images/logout-icon.png";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("loggedin");
  const fakeLogout = () => {
    localStorage.removeItem("loggedin");
  };

  function submit() {
    setStatus("submitting");
    loginUser(loginFormData)
      .then(() => {
        setError(null);
        localStorage.setItem("loggedin", true);
        navigate(location.state?.from || "/host", { replace: true });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login-page-container">
      {location.state?.message && (
        <h3 className="login-first">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {error?.message && <p className="login-error">{error.message}</p>}
      <form action={submit} className="login-form">
        <label htmlFor="email">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            onChange={handleChange}
            value={loginFormData.email}
          />
        </label>
        <label htmlFor="password">
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={loginFormData.password}
          />
        </label>
        <button
          type="submit"
          className="signin-button link-button"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="signup-cta">
        <p>
          Don&rsquo;t have an account? <span>Create one now</span>
        </p>
      </div>
      {isLoggedIn && (
        <Link to="/" className="login-link logout" onClick={fakeLogout}>
          <span>Sign out</span>
          <img src={logoutImageUrl} className="logout-icon" />
        </Link>
      )}
    </div>
  );
}
