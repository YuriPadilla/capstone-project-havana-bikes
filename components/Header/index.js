import {
  StyledHeader,
  StyledHeading,
  StyledIconFacebook,
} from "./StyledHeader.styled";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeading>
        <em>HAVANA BIKES</em>
      </StyledHeading>
      <StyledIconFacebook>
        <Link href="https://www.facebook.com/havana.bike">
          <Image
            src="/images/iconFacebook.svg"
            height={20}
            width={20}
            alt="IconFacebook"
          />
        </Link>
      </StyledIconFacebook>
    </StyledHeader>
  );
}
