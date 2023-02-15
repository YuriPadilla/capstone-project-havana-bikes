import Image from "next/image";
import Link from "next/link";
import {
  StyledPreviewSection,
  StyledBikesPreviewUl,
  StyledBikePreviewLi,
} from "./BikesPreview.styled";
import styled from "styled-components";

const StyledWrapperHeading = styled.div`
  padding: 20px 20px 0 20px;
  width: 100%;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

const StyledLinkAsButton = styled(Link)`
  text-decoration: none;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  color: black;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
  position: absolute;
  bottom: 10px;
  right: 20px;
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
