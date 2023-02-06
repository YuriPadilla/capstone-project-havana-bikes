import Header from "../Header";
import ShoppingCart from "../ShoppingCart";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <ShoppingCart />
      <main>{children}</main>
    </>
  );
}
