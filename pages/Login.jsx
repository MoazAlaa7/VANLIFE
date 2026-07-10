import { useState } from "react";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  function submit(formData) {
    console.log(
      `Email: ${formData.get("email")} Password: ${formData.get("password")}`,
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login-page-container">
      <h1>Sign in to your account</h1>
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
        <button type="submit" className="signin-button link-button">
          Sign in
        </button>
      </form>
      <div className="signup-cta">
        <p>
          Don&rsquo;t have an account? <span>Create one now</span>
        </p>
      </div>
    </div>
  );
}
