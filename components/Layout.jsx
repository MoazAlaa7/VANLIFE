import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Layout() {
  return (
    <div className="app-container">
      <header>
        <h1 className="site-logo">
          <Link to="/">#VALNLIFE</Link>
        </h1>

        <nav>
          <Link to="/about">About</Link>
          <Link to="/vans">Vans</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Ⓒ 2026 #VANLIFE</footer>
    </div>
  );
}
