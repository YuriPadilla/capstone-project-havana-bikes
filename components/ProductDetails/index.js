import {
  StyledUlDetails,
  StyledImage,
  StyledWrapper,
  StyledPreviousLink,
  StyledPreviousWrapper,
  StyledNextLink,
  StyledNextWrapper,
  StyledButtonCartWrapper,
  StyledButtonBackWrapper,
  StyledLinkAsButton,
} from "./ProductDetails.styled";
import SVGIcon from "../SVGIcon";
import useSWR from "swr";
import { StyledButton } from "../Button/Button.styled.js";
import StandardSectionApp from "../StandardSectionApp";

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
      <StandardSectionApp sectionTitle="Details">
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
      </StandardSectionApp>
    </>
  );
}
