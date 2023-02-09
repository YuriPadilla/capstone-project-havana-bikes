import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import { bikes } from "../lib/bikes.js";
import ContactInfo from "../components/ContactInfo";

export default function HomePage() {
  return (
    <>
      <p>Home</p>
      <PriceInfo />
      <BikesPreview bikes={bikes} />
      <ContactInfo />
    </>
  );
}
