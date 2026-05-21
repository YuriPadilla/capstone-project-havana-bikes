import Link from "next/link";
import SVGIcon from "../SVGIcon";
import { StyledNavBar, StyledNavLabel, StyledNavLink } from "./NavBar.styled";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <>
      <StyledNavBar>
        <Link href="/" passHref legacyBehavior>
          <StyledNavLink aria-label="Home" $active={router.pathname === "/"}>
            <SVGIcon
              variant={router.pathname === "/" ? "homeFilled" : "home"}
              width="40px"
              color={router.pathname === "/" ? "#213327" : "#acacac"}
            />
            <StyledNavLabel>Home</StyledNavLabel>
          </StyledNavLink>
        </Link>
        <Link href="/InfoPage" passHref legacyBehavior>
          <StyledNavLink
            aria-label="Info"
            $active={router.pathname === "/InfoPage"}
          >
            <SVGIcon
              variant={router.pathname === "/InfoPage" ? "infoFilled" : "info"}
              width="40px"
              color={router.pathname === "/InfoPage" ? "#213327" : "#acacac"}
            />
            <StyledNavLabel>Info</StyledNavLabel>
          </StyledNavLink>
        </Link>
        <Link href="/Bikes" passHref legacyBehavior>
          <StyledNavLink
            aria-label="Bikes"
            $active={
              router.pathname === "/Bikes" || router.pathname === "/Bikes/[id]"
            }
          >
            <SVGIcon
              variant="bicylce"
              width="40px"
              color={
                router.pathname === "/Bikes" ||
                router.pathname === "/Bikes/[id]"
                  ? "#213327"
                  : "#acacac"
              }
            />
            <StyledNavLabel>Bikes</StyledNavLabel>
          </StyledNavLink>
        </Link>
        <Link href="/ContactUsPage" passHref legacyBehavior>
          <StyledNavLink
            aria-label="Contact"
            $active={router.pathname === "/ContactUsPage"}
          >
            <SVGIcon
              variant={
                router.pathname === "/ContactUsPage" ? "sendFilled" : "send"
              }
              width="40px"
              color={
                router.pathname === "/ContactUsPage" ? "#213327" : "#acacac"
              }
            />
            <StyledNavLabel>Contact</StyledNavLabel>
          </StyledNavLink>
        </Link>
      </StyledNavBar>
    </>
  );
}
