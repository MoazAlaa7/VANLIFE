import { useOutletContext } from "react-router";

export default function VanPhotos() {
  const { van } = useOutletContext();

  return <img src={van.imageUrl} className="host-van-detail-image" />;
}
