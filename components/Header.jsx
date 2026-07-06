import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <h1 className="site-logo">
        <Link to="/">#VALNLIFE</Link>
      </h1>
      <nav>
        <Link to="/host">Host</Link>
        <Link to="/about">About</Link>
        <Link to="/vans">Vans</Link>
      </nav>
    </header>
  );
}
