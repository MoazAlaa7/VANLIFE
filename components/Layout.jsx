import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
