import Link from "next/link";
import ShoppingCart from "../../components/ShoppingCart";
import BikePartsList from "../../components/BikePartsList";

export default function BikeParts() {
  return (
    <>
      <p>
        <Link href="/">Home</Link>→Bike Parts
      </p>
      <ShoppingCart />
      <BikePartsList />
    </>
  );
}
