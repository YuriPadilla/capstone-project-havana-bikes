import { StyledShoppingCart, StyledQuantityDiv } from "./ShoppingCart.styled";
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
          <SVGIcon variant="shoppingCart" width="50px" color="black" />
          <StyledQuantityDiv>{selectedProducts?.length}</StyledQuantityDiv>
        </StyledShoppingCart>
      ) : null}
    </>
  );
}
