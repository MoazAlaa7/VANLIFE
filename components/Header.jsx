import { Link, NavLink } from "react-router";
import imageUrl from "/assets/images/avatar-icon.png";

export default function Header() {
  return (
    <header>
      <h1 className="site-logo">
        <Link className="site-logo-link" to="/">
          #VALNLIFE
        </Link>
      </h1>
      <nav>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Vans
        </NavLink>
        <Link to="/login" className="login-link">
          <img src={imageUrl} className="login-icon" />
        </Link>
      </nav>
    </header>
  );
}
