import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import useSWR from "swr";

const StyledP = styled.p`
  margin: 0;
  padding: 0;
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
  }

  return (
    <>
      <StyledP>
        <Link href="/">Home</Link>→<Link href="/Bikes">Bikes</Link>→Details
      </StyledP>
      <ProductDetails
        product={currentBike}
        handleAddToShoppingCart={handleAddToShoppingCart}
        isInShoppingCart={isInShoppingCart}
      />
    </>
  );
}
