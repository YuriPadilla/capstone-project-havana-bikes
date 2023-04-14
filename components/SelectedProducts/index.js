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
import styled from "styled-components";
import { StyledButton } from "../Button/Button.styled";
import StandardSectionApp from "../StandardSectionApp";

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function SelectedProducts({
  products,
  onRemoveFromShopCart,
  handleEmptyShoppingCart,
}) {
  return (
    <>
      <StandardSectionApp sectionTitle="Your selection">
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
      </StandardSectionApp>
    </>
  );
}
