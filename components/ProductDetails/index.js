import Image from "next/image";
import { StyledUlDetails } from "./ProductDetails.styled";

export default function ProductDetails({ product }) {
  return (
    <>
      <h2>Details</h2>
      <section>
        <Image
          src={product.imageSource}
          height={240}
          width={400}
          alt={product.brand}
          priority
        />
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
