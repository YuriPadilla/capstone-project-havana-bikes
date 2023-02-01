import Header from "../../components/Header";
import Link from "next/link";
import BikesList from "../../components/BikesList";

export default function Bikes() {
  return (
    <>
      <Header />
      <main>
        <p>
          <Link href="/">Home</Link>→Bikes
        </p>
        <BikesList />
      </main>
    </>
  );
}
