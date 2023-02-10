import Link from "next/link";
import SVGIcon from "../SVGIcon";
import { StyledNavBar } from "./NavBar.styled";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <>
      <StyledNavBar>
        <Link href="/">
          <SVGIcon
            variant={router.pathname === "/" ? "homeFilled" : "home"}
            width="40px"
            color={router.pathname === "/" ? "#213327" : "#acacac"}
          />
        </Link>
        <Link href="/InfoPage">
          <SVGIcon
            variant={router.pathname === "/InfoPage" ? "infoFilled" : "info"}
            width="40px"
            color={router.pathname === "/InfoPage" ? "#213327" : "#acacac"}
          />
        </Link>
        <Link href="/Bikes">
          <SVGIcon
            variant="bicylce"
            width="40px"
            color={
              router.pathname === "/Bikes" || router.pathname === "/Bikes/[id]"
                ? "#213327"
                : "#acacac"
            }
          />
        </Link>
        <Link href="/ContactUsPage">
          <SVGIcon
            variant={
              router.pathname === "/ContactUsPage" ? "sendFilled" : "send"
            }
            width="40px"
            color={router.pathname === "/ContactUsPage" ? "#213327" : "#acacac"}
          />
        </Link>
      </StyledNavBar>
    </>
  );
}
