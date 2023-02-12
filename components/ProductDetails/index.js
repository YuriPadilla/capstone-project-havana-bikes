import {
  StyledUlDetails,
  StyledImage,
  StyledWrapper,
  StyledPreviousNextLink,
  StyledPrevNextWrapper,
} from "./ProductDetails.styled";
import SVGIcon from "../SVGIcon";
import useSWR from "swr";

export default function ProductDetails({ product }) {
  const { data } = useSWR("/api/bikes");

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const productIndex = data.findIndex((bike) => {
    return bike._id === product._id;
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
              href={`/Bikes/${data[productIndex - 1]._id}`}
            >
              <SVGIcon variant="previous" width="50px" color="black" />
            </StyledPreviousNextLink>
          ) : (
            <StyledPrevNextWrapper>
              <SVGIcon variant="previous" width="50px" color="#acacac" />
            </StyledPrevNextWrapper>
          )}

          {productIndex < data.length - 1 ? (
            <StyledPreviousNextLink
              href={`/Bikes/${data[productIndex + 1]._id}`}
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
