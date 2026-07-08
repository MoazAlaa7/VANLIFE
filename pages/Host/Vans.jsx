import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
        setLoading(false);
      });
  }, []);

  const vanElements = vans.map((van) => {
    return (
      <Link to={`/host/vans/${van.id}`}>
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
