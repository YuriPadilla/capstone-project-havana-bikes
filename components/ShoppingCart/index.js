import {
  StyledShoppingCart,
  StyledQuantityWrapper,
} from "./ShoppingCart.styled";
import SVGIcon from "../SVGIcon";
import useLocalStorageState from "use-local-storage-state";

export default function ShoppingCart() {
  const [selectedProducts] = useLocalStorageState("selectedProducts", {
    defaultValue: [],
  });

  return (
    <>
      {selectedProducts?.length > 0 || !selectedProducts === null ? (
        <StyledShoppingCart href="/ShoppingCartPage">
          <SVGIcon variant="shoppingCart" width="40px" color="black" />
          <StyledQuantityWrapper>
            <strong>{selectedProducts?.length}</strong>
          </StyledQuantityWrapper>
        </StyledShoppingCart>
      ) : null}
    </>
  );
}
