import Header from "../components/Header";
import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import { bikes } from "../lib/bikes.js";
import BikePartsPreview from "../components/BikePartsPreview";
import { bikeParts } from "../lib/bikeParts";
import ContactInfo from "../components/ContactInfo";

export default function HomePage() {
  return (
    <>
      <Header />
      <p>Home</p>
      <PriceInfo />
      <BikesPreview bikes={bikes} />
      <BikePartsPreview bikeParts={bikeParts} />
      <ContactInfo />
    </>
  );
}
