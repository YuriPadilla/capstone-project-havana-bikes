import { bikes } from "../../lib/bikes.js";
import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";
import { StyledButton } from "../../components/Button/Button.styled";

export default function Bike() {
  const router = useRouter();
  const { id } = router.query;

  const currentBike = bikes.find((bike) => bike.id === id);

  if (!currentBike) {
    return null;
  }

  return (
    <>
      <p>
        <Link href="/">Home</Link>→<Link href="/Bikes">Bikes</Link>→Details
      </p>
      <ProductDetails product={currentBike} />
      <StyledButton type="button">Add to Shopping Cart</StyledButton>
    </>
  );
}
