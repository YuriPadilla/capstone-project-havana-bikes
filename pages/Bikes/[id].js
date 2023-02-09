import { bikes } from "../../lib/bikes.js";
import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";
import { StyledButton } from "../../components/Button/Button.styled";
import useLocalStorageState from "use-local-storage-state";
import SVGIcon from "../../components/SVGIcon";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const StyledLinkButton = styled(Link)`
  border: 1px solid black;
  border-radius: 50%;
  padding: 6px;
  background: rgb(216, 216, 204);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 15px #272727;
`;

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

  function handleAddToShoppingCart() {
    setSelectedProducts([...selectedProducts, currentBike]);
    router.push("/Bikes");
  }

  return (
    <>
      <p>
        <Link href="/">Home</Link>→<Link href="/Bikes">Bikes</Link>→Details
      </p>
      <ProductDetails product={currentBike} />
      <StyledWrapper>
        <StyledButton type="button" onClick={handleAddToShoppingCart}>
          Add to Shopping Cart
        </StyledButton>
        <StyledLinkButton href="/Bikes">
          <SVGIcon variant="back" width="30px" color="black" />
        </StyledLinkButton>
      </StyledWrapper>
    </>
  );
}
