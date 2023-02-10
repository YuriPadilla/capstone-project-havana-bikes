import Header from "../Header";
import ShoppingCart from "../ShoppingCart";
import { StyledMain } from "./Layout.styled";
import NavBar from "../NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <ShoppingCart />
      <StyledMain>{children}</StyledMain>
      <NavBar />
    </>
  );
}
