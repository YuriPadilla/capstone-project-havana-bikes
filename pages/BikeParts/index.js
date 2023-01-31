import Header from "../../components/Header";
import Link from "next/link";
import BikePartsList from "../../components/BikePartsList";

export default function BikeParts() {
  return (
    <>
      <Header />
      <p>
        <Link href="/">Home</Link>→Bike Parts
      </p>
      <BikePartsList />
    </>
  );
}
