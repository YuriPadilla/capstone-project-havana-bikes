//import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledBikePreview = styled.section`
  display: flex;
`;

export default function BikesPreview({ bikes }) {
  const bikesForPreview = bikes.slice(0, 4);

  return (
    <>
      <h2>Bikes</h2>
      <StyledBikePreview>
        {bikesForPreview.map((bike) => {
          return (
            <Image
              key={bike.id}
              src={bike.imageSource}
              height={50}
              width={60}
              alt={bike.mark}
              priority
            />
          );
        })}
        <Link href="/Bikes">Show all...</Link>
      </StyledBikePreview>
    </>
  );
}
