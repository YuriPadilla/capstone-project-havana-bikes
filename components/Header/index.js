import { StyledHeader, StyledHeading } from "./StyledHeader.styled";
import ShoppingCart from "../ShoppingCart";

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeading>
        <em>HAVANA BIKES</em>
      </StyledHeading>
      <ShoppingCart />
    </StyledHeader>
  );
}
