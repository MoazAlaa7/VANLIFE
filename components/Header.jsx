import { useState } from "react";
import { Link, NavLink } from "react-router";
import avatarImageUrl from "/assets/images/avatar-icon.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header>
      <h1 className="site-logo">
        <Link className="site-logo-link" to="/" onClick={closeMenu}>
          #VALNLIFE
        </Link>
      </h1>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "active-link" : null)}
          onClick={closeMenu}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
          onClick={closeMenu}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : null)}
          onClick={closeMenu}
        >
          Vans
        </NavLink>
        <Link to="/login" className="login-link" onClick={closeMenu}>
          <img src={avatarImageUrl} className="login-icon" alt="Login" />
        </Link>
      </nav>
    </header>
  );
}
