import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Vans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const vanElements = vans.map((van) => {
    return (
      <div key={van.id} className="van-container">
        <Link to={`/vans/${van.id}`}>
          <img src={van.imageUrl} alt="van-image" />
          <div className="van-info">
            <h3>{van.name}</h3>
            <h3>
              ${van.price}
              <span>/day</span>
            </h3>
            <p className={`van-type ${van.type} selected`}>{van.type}</p>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
