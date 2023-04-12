import Image from "next/image";
import Link from "next/link";
import {
  StyledPreviewSection,
  StyledBikesPreviewUl,
  StyledBikePreviewLi,
} from "./BikesPreview.styled";
import styled from "styled-components";
import { StyledLinkAsButton } from "../Button/Button.styled.js";

const StyledWrapperHeading = styled.div`
  padding: 20px 20px 0 20px;
  width: 100%;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

export default function BikesPreview({ bikes }) {
  const bikesForPreview = bikes.slice(0, 4);

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
