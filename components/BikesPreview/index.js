import Image from "next/image";
import Link from "next/link";
import {
  StyledPreviewSection,
  StyledBikesPreviewUl,
  StyledBikePreviewLi,
} from "./BikesPreview.styled";

export default function BikesPreview({ bikes }) {
  const bikesForPreview = bikes.slice(0, 4);

  return (
    <>
      <h2>Bikes</h2>
      <StyledPreviewSection>
        <StyledBikesPreviewUl>
          {bikesForPreview.map((bike) => {
            return (
              <StyledBikePreviewLi key={bike.id}>
                <Image
                  src={bike.imageSource}
                  height={40}
                  width={60}
                  alt={bike.brand}
                  priority
                />
              </StyledBikePreviewLi>
            );
          })}
        </StyledBikesPreviewUl>
        <Link href="/Bikes">Show all...</Link>
      </StyledPreviewSection>
    </>
  );
}
