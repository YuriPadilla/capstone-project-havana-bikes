import Header from "../../components/Header";
import Link from "next/link";
import BikePartsList from "../../components/BikePartsList";

export default function BikeParts() {
  return (
    <>
      <Header />
      <p>
        <Link href="/">Home</Link>→<Link href="">Bike Parts</Link>
      </p>
      <BikePartsList />
    </>
  );
}
