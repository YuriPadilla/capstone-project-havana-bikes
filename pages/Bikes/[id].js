import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";
import useLocalStorageState from "use-local-storage-state";
import SVGIcon from "../../components/SVGIcon";
import styled, { css } from "styled-components";
import useSWR from "swr";

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

const StyledButton = styled.button`
  text-decoration: none;
  border: 1px solid #acacac;
  border-radius: 8px;
  color: #acacac;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
  background: transparent;
  ${({ disabled }) => {
    if (disabled === false) {
      return css`
        border: 1px solid black;
        box-shadow: 1px 3px 12px rgb(95, 117, 129);
        background: rgb(216, 216, 204);
        color: black;
      `;
    }
  }}
`;

export default function Bike() {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState(
    "selectedProducts",
    { defaultValue: [] }
  );
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(id ? `/api/bikes/${id}` : null);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data) {
    return <div>loading...</div>;
  }

  const currentBike = data;

  const isInShoppingCart = selectedProducts.some((product) => {
    return product._id === currentBike._id;
  });

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
        <StyledButton
          type="button"
          onClick={handleAddToShoppingCart}
          disabled={isInShoppingCart}
        >
          Add to Shopping Cart
        </StyledButton>
        <StyledLinkButton href="/Bikes">
          <SVGIcon variant="back" width="30px" color="black" />
        </StyledLinkButton>
      </StyledWrapper>
    </>
  );
}
