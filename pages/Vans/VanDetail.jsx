import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [id]);

  return (
    <div className="van-detail-container">
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
