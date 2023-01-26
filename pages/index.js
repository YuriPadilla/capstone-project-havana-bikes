import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import { bikes } from "../lib/bikes.js";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <p>Home</p>
      <PriceInfo />
      <BikesPreview bikes={bikes} />
    </>
  );
}
