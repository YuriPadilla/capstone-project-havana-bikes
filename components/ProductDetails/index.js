import Image from "next/image";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style-type: none;
`;

export default function ProductDetails({ product }) {
  return (
    <>
      <h2>Details</h2>
      <section>
        <Image
          src={product.imageSource}
          height={240}
          width={400}
          alt={product.mark}
          priority
        />
        <article>
          <StyledUl>
            <li>
              <strong>Mark:</strong> {product.mark}
            </li>
            <li>
              <strong>Size:</strong> {product.size}
            </li>
          </StyledUl>
        </article>
      </section>
    </>
  );
}
