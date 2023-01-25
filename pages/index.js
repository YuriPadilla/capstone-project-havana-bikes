import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import { bikes } from "../lib/bikes.js";

export default function HomePage() {
  return (
    <>
      <PriceInfo />
      <BikesPreview bikes={bikes} />
    </>
  );
}
