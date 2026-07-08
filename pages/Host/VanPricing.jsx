import { useOutletContext } from "react-router";

export default function VanPricing() {
  const { van } = useOutletContext();

  return (
    <h3 className="host-van-price">
      ${van.price}
      <span>/day</span>
    </h3>
  );
}
