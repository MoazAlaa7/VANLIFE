import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  const vanElements = filteredVans.map((van) => {
    return (
      <div key={van.id} className="van-container">
        <Link to={van.id}>
          <img src={van.imageUrl} alt="van-image" />
          <div className="van-info">
            <h2>{van.name}</h2>
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
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
          onClick={() => setSearchParams({ type: "simple" })}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
          onClick={() => setSearchParams({ type: "luxury" })}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
          onClick={() => setSearchParams({ type: "rugged" })}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => setSearchParams({})}
            className="clear-filters-button"
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
