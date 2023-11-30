import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";

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
      <ProductDetails
        product={currentBike}
        handleAddToShoppingCart={handleAddToShoppingCart}
        isInShoppingCart={isInShoppingCart}
      />
    </>
  );
}
