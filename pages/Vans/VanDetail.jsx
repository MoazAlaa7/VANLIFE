import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router";
import { getVans } from "../../api";

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans(id);
        setVan(data);
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
    return <h2 className="loading-message">Loading van details...</h2>;
  }

  return (
    <div className="van-detail-container">
      {/* Using the search params from the Link state prop to preserve the search
      params when navigating back to the Vans page. */}
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} alt="van-image" />
          <p className={`van-type ${van.type} selected`}>{van.type}</p>
          <h2>{van.name}</h2>
          <h3>
            ${van.price}
            <span>/day</span>
          </h3>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2 className="loading-message">Loading...</h2>
      )}
    </div>
  );
}
