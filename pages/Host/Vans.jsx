import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getHostVans } from "../../api";

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getHostVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  const vanElements = vans.map((van) => {
    return (
      <Link to={van.id} key={van.id}>
        <div key={van.id} className="host-van-container">
          <img src={van.imageUrl} alt={`Image of ${van.name} van`} />
          <div className="host-van-info">
            <h2>{van.name}</h2>
            <h3>
              ${van.price}
              /day
            </h3>
          </div>
        </div>
      </Link>
    );
  });

  function renderVanElements() {
    if (error) {
      return (
        <h2 className="error-message">
          There was an error: <span>{error.message}</span>
        </h2>
      );
    }

    if (loading) {
      return <h2 className="loading-message">Loading your vans...</h2>;
    }

    if (vans.length === 0) {
      return <h2 className="loading-message">You have no vans yet.</h2>;
    }

    return vanElements;
  }

  return (
    <div className="van-list-container">
      <h1>Your listed vans</h1>
      <div className="host-van-list">{renderVanElements()}</div>
    </div>
  );
}
