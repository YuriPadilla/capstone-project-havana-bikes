import {
  StyledUlDetails,
  StyledImage,
  StyledWrapper,
  StyledPreviousNextLink,
  StyledPrevNextWrapper,
} from "./ProductDetails.styled";
import SVGIcon from "../SVGIcon";
import { bikes } from "../../lib/bikes";

export default function ProductDetails({ product }) {
  const productIndex = bikes.findIndex((bike) => {
    return bike.id === product.id;
  });

  return (
    <>
      <h2>Details</h2>
      <section>
        <StyledImage
          src={product.imageSource}
          height={240}
          width={400}
          alt={product.brand}
          priority
        />
        <StyledWrapper>
          {productIndex > 0 ? (
            <StyledPreviousNextLink
              href={`/Bikes/${bikes[productIndex - 1].id}`}
            >
              <SVGIcon variant="previous" width="50px" color="black" />
            </StyledPreviousNextLink>
          ) : (
            <StyledPrevNextWrapper>
              <SVGIcon variant="previous" width="50px" color="#acacac" />
            </StyledPrevNextWrapper>
          )}

          {productIndex < bikes.length - 1 ? (
            <StyledPreviousNextLink
              href={`/Bikes/${bikes[productIndex + 1].id}`}
            >
              <SVGIcon variant="next" width="50px" color="black" />
            </StyledPreviousNextLink>
          ) : (
            <StyledPrevNextWrapper>
              <SVGIcon variant="next" width="50px" color="#acacac" />
            </StyledPrevNextWrapper>
          )}
        </StyledWrapper>
        <article>
          <StyledUlDetails>
            <li>
              <strong>Brand:</strong> {product.brand}
            </li>
            <li>
              <strong>Size:</strong> {product.size}
            </li>
          </StyledUlDetails>
        </article>
      </section>
    </>
  );
}
