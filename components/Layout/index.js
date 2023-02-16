import Header from "../Header";
import { StyledMain } from "./Layout.styled";
import NavBar from "../NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
      <NavBar />
    </>
  );
}
