import {
  StyledSelectionUl,
  StyledProductLi,
  StyledProductDiv,
  StyledImage,
  StyledDescriptionUl,
  StyledRemoveButton,
} from "./SelectedProducts.styled";
import Link from "next/link";
import SVGIcon from "../SVGIcon";
import styled, { css } from "styled-components";
import { StyledButton } from "../Button/Button.styled";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 20px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const StyledWrapperHeading = styled.div`
  width: 100%;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// const StyledButton = styled.button`
//   text-decoration: none;
//   border: 1px solid #acacac;
//   border-radius: 8px;
//   color: #acacac;
//   font-size: inherit;
//   font-family: inherit;
//   padding: 3px 7px;
//   background: transparent;
//   ${({ disabled }) => {
//     if (disabled === false) {
//       return css`
//         border: 1px solid rgb(205, 211, 205);
//         box-shadow: 3px 3px 8px rgb(95, 117, 129);
//         background: rgb(222, 245, 234);
//         color: black;
//       `;
//     }
//   }}
// `;

export default function SelectedProducts({
  products,
  onRemoveFromShopCart,
  handleEmptyShoppingCart,
}) {
  return (
    <>
      <StyledSection>
        <StyledWrapperHeading>
          <StyledHeadingH3>Your selection</StyledHeadingH3>
          <hr />
        </StyledWrapperHeading>
        <StyledSelectionUl>
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <StyledProductLi key={product._id}>
                  <StyledProductDiv>
                    <Link href={`/Bikes/${product._id}`}>
                      <StyledImage
                        src={product.imageSource}
                        height={70}
                        width={120}
                        alt={product.brand}
                        priority
                      />
                    </Link>
                    <StyledDescriptionUl>
                      <li>
                        <strong>Brand:</strong> {product.brand}
                      </li>
                      <li>
                        <strong>Size:</strong> {product.size}
                      </li>
                    </StyledDescriptionUl>
                    <StyledRemoveButton
                      onClick={() => {
                        onRemoveFromShopCart(product._id);
                      }}
                    >
                      <SVGIcon variant="remove" width="30px" color="black" />
                    </StyledRemoveButton>
                  </StyledProductDiv>
                </StyledProductLi>
              );
            })
          ) : (
            <p>No products to show</p>
          )}
        </StyledSelectionUl>
        <StyledButtonWrapper>
          <StyledButton
            type="button"
            onClick={handleEmptyShoppingCart}
            disabled={!(products.length > 0)}
          >
            Empty shopping cart
          </StyledButton>
        </StyledButtonWrapper>
      </StyledSection>
    </>
  );
}
