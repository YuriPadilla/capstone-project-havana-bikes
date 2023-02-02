import Image from "next/image";
import Link from "next/link";
import {
  StyledPreviewSection,
  StyledPartsPreviewUl,
  StyledPartsPreviewLi,
} from "./BikePartsPreview.styled";

export default function BikePartsPreview({ bikeParts }) {
  const bikePartsForPreview = bikeParts.slice(0, 4);

  return (
    <>
      <h2>Bike Parts</h2>
      <StyledPreviewSection>
        <StyledPartsPreviewUl>
          {bikePartsForPreview.map((bikePart) => {
            return (
              <StyledPartsPreviewLi key={bikePart.id}>
                <Image
                  src={bikePart.imageSource}
                  height={40}
                  width={60}
                  alt={bikePart.name}
                  priority
                />
              </StyledPartsPreviewLi>
            );
          })}
        </StyledPartsPreviewUl>
        <Link href="/BikeParts">Show all...</Link>
      </StyledPreviewSection>
    </>
  );
}
