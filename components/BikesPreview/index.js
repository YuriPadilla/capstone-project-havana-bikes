import Image from "next/image";
import Link from "next/link";
import {
  StyledPreviewSection,
  StyledBikesPreviewUl,
  StyledBikePreviewLi,
  StyledWrapperHeading,
  StyledHeadingH3,
} from "./BikesPreview.styled.js";
import { StyledLinkAsButton } from "../Button/Button.styled.js";

export default function BikesPreview({ bikes }) {
  if (!bikes) {
    return null;
  }

  if (!Array.isArray(bikes)) {
    console.warn("BikesPreview: expected bikes to be an array but got:", bikes);
    return (
      <StyledPreviewSection>
        <StyledWrapperHeading>
          <StyledHeadingH3>Bikes</StyledHeadingH3>
          <hr />
        </StyledWrapperHeading>
        <p>No bikes available</p>
      </StyledPreviewSection>
    );
  }

  return (
    <>
      <StyledPreviewSection>
        <StyledWrapperHeading>
          <StyledHeadingH3>Bikes</StyledHeadingH3>
          <hr />
        </StyledWrapperHeading>
        <StyledBikesPreviewUl>
          {bikes.map((bike) => {
            return (
              <StyledBikePreviewLi key={bike._id}>
                <Link href={`/Bikes/${bike._id}`}>
                  <Image
                    src={bike.imageSource}
                    height={74}
                    width={125}
                    alt={bike.brand}
                    priority
                  />
                </Link>
              </StyledBikePreviewLi>
            );
          })}
        </StyledBikesPreviewUl>
        <StyledLinkAsButton href="/Bikes">Show all</StyledLinkAsButton>
      </StyledPreviewSection>
    </>
  );
}
