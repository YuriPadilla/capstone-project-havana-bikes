import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import { bikes } from "../lib/bikes.js";
import Header from "../components/Header";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Header />
      <p>
        <Link href="">Home</Link>
      </p>
      <PriceInfo />
      <BikesPreview bikes={bikes} />
    </>
  );
}
