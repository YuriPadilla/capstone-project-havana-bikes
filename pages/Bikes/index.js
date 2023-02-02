import Link from "next/link";
import ShoppingCart from "../../components/ShoppingCart";
import BikesList from "../../components/BikesList";

export default function Bikes() {
  return (
    <>
      <p>
        <Link href="/">Home</Link>→Bikes
      </p>
      <ShoppingCart />
      <BikesList />
    </>
  );
}
