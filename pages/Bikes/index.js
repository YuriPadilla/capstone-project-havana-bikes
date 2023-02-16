import Link from "next/link";
import BikesList from "../../components/BikesList";
import styled from "styled-components";

const StyledP = styled.p`
  margin: 0;
  padding: 0;
`;

export default function Bikes() {
  return (
    <>
      <StyledP>
        <Link href="/">Home</Link>→Bikes
      </StyledP>
      <BikesList />
    </>
  );
}
