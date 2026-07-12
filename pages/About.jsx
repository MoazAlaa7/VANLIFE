import { Link } from "react-router";
import heroImg from "../assets/images/about-hero.png";

export default function About() {
  return (
    <div className="about-container">
      <img
        src={heroImg}
        alt="About page hero image"
        className="about-hero-image"
      />
      <div className="about-content">
        <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
        <p>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch.{" "}
          <span>(Hitch costs extra 😉)</span>
        </p>
        <p>
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </p>
      </div>
      <div className="about-cta">
        <h2>Your destination is waiting. Your van is ready.</h2>
        <Link to="/vans" className="link-button">
          Explore our vans
        </Link>
      </div>
    </div>
  );
}
