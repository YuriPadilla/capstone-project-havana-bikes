import Header from "../../components/Header";
import Link from "next/link";
import BikesList from "../../components/BikesList";

export default function Bikes() {
  return (
    <>
      <Header />
      <p>
        <Link href="/">Home</Link>→<Link href="">Bikes</Link>
      </p>
      <BikesList />
    </>
  );
}
