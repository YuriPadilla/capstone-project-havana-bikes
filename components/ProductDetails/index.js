import {
  StyledUlDetails,
  StyledImage,
  StyledWrapper,
  StyledPreviousLink,
  StyledPreviousWrapper,
  StyledNextLink,
  StyledNextWrapper,
} from "./ProductDetails.styled";
import SVGIcon from "../SVGIcon";
import useSWR from "swr";
import styled, { css } from "styled-components";
import Link from "next/link";
import { StyledButton } from "../Button/Button.styled.js";

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

const StyledButtonCartWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
  margin: 14px 0;
`;

const StyledButtonBackWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  margin: 15px 0;
`;

const StyledLinkAsButton = styled(Link)`
  border: 1px solid rgb(205, 211, 205);
  border-radius: 50%;
  padding: 6px;
  background: rgb(222, 245, 234);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
`;

export default function ProductDetails({
  product,
  handleAddToShoppingCart,
  isInShoppingCart,
}) {
  const { data, error, isLoading } = useSWR("/api/bikes");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const productIndex = data.findIndex((bike) => {
    return bike._id === product._id;
  });

  return (
    <>
      <StyledSection>
        <StyledWrapperHeading>
          <StyledHeadingH3>Details</StyledHeadingH3>
          <hr />
        </StyledWrapperHeading>
        <StyledWrapper>
          {productIndex > 0 ? (
            <StyledPreviousLink href={`/Bikes/${data[productIndex - 1]._id}`}>
              <SVGIcon variant="previous" width="35px" color="black" />
            </StyledPreviousLink>
          ) : (
            <StyledPreviousWrapper>
              <SVGIcon variant="previous" width="35px" color="#acacac" />
            </StyledPreviousWrapper>
          )}
          <StyledImage
            src={product.imageSource}
            height={197}
            width={333}
            alt={product.brand}
            priority
          />
          {productIndex < data.length - 1 ? (
            <StyledNextLink href={`/Bikes/${data[productIndex + 1]._id}`}>
              <SVGIcon variant="next" width="35px" color="black" />
            </StyledNextLink>
          ) : (
            <StyledNextWrapper>
              <SVGIcon variant="next" width="35px" color="#acacac" />
            </StyledNextWrapper>
          )}
        </StyledWrapper>
        <StyledUlDetails>
          <li>
            <strong>Brand:</strong> {product.brand}
          </li>
          <li>
            <strong>Size:</strong> {product.size}
          </li>
        </StyledUlDetails>
        <StyledButtonCartWrapper>
          <StyledButton
            type="button"
            onClick={handleAddToShoppingCart}
            disabled={isInShoppingCart}
          >
            Add to Shopping Cart
          </StyledButton>
        </StyledButtonCartWrapper>
        <StyledButtonBackWrapper>
          <StyledLinkAsButton href="/Bikes">
            <SVGIcon variant="back" width="30px" color="black" />
          </StyledLinkAsButton>
        </StyledButtonBackWrapper>
      </StyledSection>
    </>
  );
}
