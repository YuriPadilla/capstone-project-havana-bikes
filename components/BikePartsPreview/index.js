import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledBikePartsPreview = styled.section`
  display: flex;
`;

export default function BikePartsPreview({ bikeParts }) {
  const bikePartsForPreview = bikeParts.slice(0, 4);

  return (
    <>
      <h2>Bike Parts</h2>
      <StyledBikePartsPreview>
        <div>
          {bikePartsForPreview.map((bikePart) => {
            return (
              <Image
                key={bikePart.id}
                src={bikePart.imageSource}
                height={50}
                width={60}
                alt={bikePart.name}
                priority
              />
            );
          })}
        </div>
        <Link href="/BikeParts">Show all...</Link>
      </StyledBikePartsPreview>
    </>
  );
}
