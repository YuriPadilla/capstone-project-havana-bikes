import Image from "next/image";
import Link from "next/link";
import {
  StyledPreviewSection,
  StyledBikesPreviewUl,
  StyledBikePreviewLi,
  StyledBikePreviewLink,
  StyledBikePreviewName,
  StyledBikePreviewPrice,
  StyledWrapperHeading,
  StyledHeadingH3,
  StyledSectionLink,
} from "./BikesPreview.styled.js";

export default function BikesPreview({ bikes }) {

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
                <Link href={`/Bikes/${bike._id}`} passHref legacyBehavior>
                  <StyledBikePreviewLink>
                    <Image
                      src={bike.imageSource}
                      height={74}
                      width={125}
                      alt={bike.brand}
                      priority
                    />
                    <StyledBikePreviewName>
                      {bike.name || bike.brand}
                    </StyledBikePreviewName>
                    {bike.pricePerDay && (
                      <StyledBikePreviewPrice>
                        {bike.pricePerDay} USD / day
                      </StyledBikePreviewPrice>
                    )}
                  </StyledBikePreviewLink>
                </Link>
              </StyledBikePreviewLi>
            );
          })}
        </StyledBikesPreviewUl>
        <StyledSectionLink href="/Bikes">Show all</StyledSectionLink>
      </StyledPreviewSection>
    </>
  );
}
