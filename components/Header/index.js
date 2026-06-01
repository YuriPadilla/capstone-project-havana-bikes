import useSiteSettings from "@/hooks/useSiteSettings";
import { StyledHeader, StyledHeading } from "./StyledHeader.styled";
import ShoppingCart from "../ShoppingCart";

export default function Header() {
  const { settings } = useSiteSettings();
  const businessName = settings.businessName || "Havana Bikes";

  return (
    <StyledHeader>
      <StyledHeading>
        <em>{businessName.toUpperCase()}</em>
      </StyledHeading>
      <ShoppingCart />
    </StyledHeader>
  );
}
