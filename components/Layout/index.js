import Header from "../Header";
import ShoppingCart from "../ShoppingCart";
import NavBar from "../NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <ShoppingCart />
      <main>{children}</main>
      <NavBar />
    </>
  );
}
