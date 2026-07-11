import { useState, useEffect } from "react";
import { Link, NavLink, useParams, Outlet } from "react-router";
import { getHostVans } from "../../api";

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getHostVans(id);
        setVan(data[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  if (error) {
    return (
      <h2 className="error-message">
        There was an error: <span>{error.message}</span>
      </h2>
    );
  }

  if (loading) {
    return <h2 className="loading-message">Loading your van details...</h2>;
  }

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

        {van && <Outlet context={{ van }} />}
      </div>
    </section>
  );
}
