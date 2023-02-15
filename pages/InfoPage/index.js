import Link from "next/link";
import PriceInfoMore from "../../components/PriceInfoMore";
import styled from "styled-components";

const StyledP = styled.p`
  margin: 0;
  padding: 0;
`;

export default function InfoPage() {
  return (
    <>
      <StyledP>
        <Link href="/">Home</Link>→Contact us
      </StyledP>
      <PriceInfoMore />
    </>
  );
}
