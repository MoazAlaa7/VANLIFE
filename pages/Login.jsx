import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import logoutImageUrl from "/assets/images/logout-icon.png";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { user, login, logout, status, error, setError } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(loginFormData);
      navigate(location.state?.from || "/host", {
        replace: true,
        state: { name: data.user.name },
      });
    } catch {
      // Auth context already throws error.
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await logout();
    } catch {
      // Auth context already throws error.
    }
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
      <form onSubmit={handleLogin} className="login-form">
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
      {user ? (
        <Link to="/" className="login-link logout" onClick={handleLogout}>
          <span>Sign out</span>
          <img src={logoutImageUrl} className="logout-icon" />
        </Link>
      ) : (
        <div className="test-user">
          <h4>For testing use:</h4>
          <p>
            Email:<span> t@test.com</span> | Password:
            <span> p123456</span>
          </p>
        </div>
      )}
    </div>
  );
}
