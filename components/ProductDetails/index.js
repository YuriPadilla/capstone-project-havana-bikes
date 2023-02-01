import Image from "next/image";

export default function ProductDetails({ product }) {
  return (
    <>
      <h2>Details</h2>
      <section>
        <Image
          src={product.imageSource}
          height={240}
          width={400}
          alt={product.marke}
          priority
        />
        <article>
          <p>
            <strong>Mark:</strong> {product.marke}
            <br />
            <strong>Size:</strong> {product.size}
          </p>
        </article>
      </section>
    </>
  );
}
