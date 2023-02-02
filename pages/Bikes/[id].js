import { bikes } from "../../lib/bikes.js";
import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";
import { StyledButton } from "../../components/Button/Button.styled";
import useLocalStorageState from "use-local-storage-state";
import ShoppingCart from "../../components/ShoppingCart";

export default function Bike() {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState(
    "selectedProducts",
    { defaultValue: [] }
  );
  const router = useRouter();
  const { id } = router.query;

  const currentBike = bikes.find((bike) => bike.id === id);

  if (!currentBike) {
    return null;
  }

  function onAddToShoppingCart() {
    setSelectedProducts([...selectedProducts, currentBike]);
    router.push("/Bikes");
  }

  return (
    <>
      <p>
        <Link href="/">Home</Link>→<Link href="/Bikes">Bikes</Link>→Details
      </p>
      <ShoppingCart />
      <ProductDetails product={currentBike} />
      <StyledButton type="button" onClick={onAddToShoppingCart}>
        Add to Shopping Cart
      </StyledButton>
    </>
  );
}
