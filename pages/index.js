import ShoppingCart from "../components/ShoppingCart";
import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import { bikes } from "../lib/bikes.js";
import BikePartsPreview from "../components/BikePartsPreview";
import { bikeParts } from "../lib/bikeParts";
import ContactInfo from "../components/ContactInfo";

export default function HomePage() {
  return (
    <>
      <p>Home</p>
      <ShoppingCart />
      <PriceInfo />
      <BikesPreview bikes={bikes} />
      <BikePartsPreview bikeParts={bikeParts} />
      <ContactInfo />
    </>
  );
}
