import { useState, useEffect } from "react";
import { Link, NavLink, useParams, Outlet } from "react-router";

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans[0]));
  }, [id]);

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail-container">
          {van ? (
            <>
              <img src={van.imageUrl} alt="van-image" />
              <div className="van-detail">
                <p className={`van-type ${van.type} selected`}>{van.type}</p>
                <h2>{van.name}</h2>
                <h3>
                  ${van.price}
                  <span>/day</span>
                </h3>
              </div>
            </>
          ) : (
            <h2 className="loading-message">Loading...</h2>
          )}
        </div>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            Photos
          </NavLink>
        </nav>

        <Outlet context={{ van }} />
      </div>
    </section>
  );
}
