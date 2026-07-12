import { useState, useEffect } from "react";
import { Link } from "react-router";
import { BsStarFill } from "react-icons/bs";
import { getHostVans } from "../../api";

export default function Dashboard() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
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

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <div key={van.id} className="host-van-container">
        <img src={van.imageUrl} alt={`Image of ${van.name} van`} />
        <div className="host-van-info">
          <h2>{van.name}</h2>
          <h3>
            ${van.price}
            /day
          </h3>
        </div>
        <Link to={`vans/${van.id}`} className="van-view-link">
          Edit
        </Link>
      </div>
    ));

    return <section className="host-van-list">{hostVansEls}</section>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>

      <section className="host-dashboard-reviews">
        <h2>Review score</h2>
        <BsStarFill className="star" />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>

      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans">View all</Link>
        </div>
        {loading && !vans ? (
          <h1>Loading...</h1>
        ) : (
          <>{renderVanElements(vans)}</>
        )}
      </section>
    </>
  );
}
