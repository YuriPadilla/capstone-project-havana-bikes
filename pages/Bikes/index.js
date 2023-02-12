import Link from "next/link";
import BikesList from "../../components/BikesList";

export default function Bikes() {
  return (
    <>
      <p>
        <Link href="/">Home</Link>→Bikes
      </p>
      <BikesList />
    </>
  );
}
