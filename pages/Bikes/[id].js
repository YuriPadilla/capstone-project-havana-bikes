import Header from "../../components/Header";
import { bikes } from "../../lib/bikes.js";
import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";

export default function Bike() {
  const router = useRouter();
  const { id } = router.query;

  const currentBike = bikes.find((bike) => bike.id === id);

  if (!currentBike) {
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <p>
          <Link href="/">Home</Link>→<Link href="/Bikes">Bikes</Link>→Details
        </p>
        <ProductDetails product={currentBike} />
      </main>
    </>
  );
}
