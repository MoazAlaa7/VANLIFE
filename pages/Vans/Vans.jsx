import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getVans } from "../../api";

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  const vanElements = filteredVans.map((van) => {
    return (
      <div key={van.id} className="van-container">
        {/* Passing search params to the VanDetail page using the Link state prop
        to preserve the search params when navigating to the VanDetail page and
        back. */}
        <Link
          to={van.id}
          state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
          className="van-link"
        >
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

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  function renderVanElements() {
    if (error) {
      return (
        <h2 className="error-message">
          There was an error: <span>{error.message}</span>
        </h2>
      );
    }

    if (loading) {
      return <h2 className="loading-message">Loading available vans...</h2>;
    }

    if (vans.length === 0) {
      return (
        <h2 className="loading-message">No vans are available right now.</h2>
      );
    }

    return vanElements;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
          onClick={() => handleFilterChange("type", "simple")}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
          onClick={() => handleFilterChange("type", "luxury")}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
          onClick={() => handleFilterChange("type", "rugged")}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="clear-filters-button"
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <div className="van-list">{renderVanElements()}</div>
    </div>
  );
}
