import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledBikePreview = styled.section`
  display: flex;
`;

export default function BikesPreview({ bikes }) {
  const bikesForPreview = [];
  bikes.forEach((bike) => {
    if (bikesForPreview.length < 4) {
      bikesForPreview.push(bike);
    }
  });
  return (
    <>
      <h2>Bikes</h2>
      <StyledBikePreview>
        <div>
          {bikesForPreview.map((bike) => {
            return (
              <Image
                key={uuidv4()}
                src={bike.imageSource}
                height={50}
                width={60}
                alt={bike.marke}
                priority
              />
            );
          })}
        </div>
        <Link href="/Bikes">Show all...</Link>
      </StyledBikePreview>
    </>
  );
}
