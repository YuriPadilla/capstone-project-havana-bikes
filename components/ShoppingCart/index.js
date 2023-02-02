import { StyledShoppingCart } from "./ShoppingCart.styled";
import SVGIcon from "../SVGIcon";
import { useState, useEffect } from "react";

export default function ShoppingCart() {
  //To avoid errors of hydration when refreshing.
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }
  //*******************************

  function getProductsShoppingCart() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("selectedProducts"));
    }
  }

  return (
    <StyledShoppingCart
      href="/ShoppingCartPage"
      disabled={
        getProductsShoppingCart()?.length === 0 ||
        getProductsShoppingCart() === null
      }
    >
      <SVGIcon
        variant="shoppingCart"
        width="50px"
        color={`${
          getProductsShoppingCart()?.length === 0 ||
          getProductsShoppingCart() === null
            ? "transparent"
            : "black"
        }`}
      />
    </StyledShoppingCart>
  );
}
