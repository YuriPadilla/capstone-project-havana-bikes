import { StyledHeader, StyledIconFacebook } from "./StyledHeader.styled";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <StyledHeader>
      <h3>
        <em>HAVANA BIKES</em>
      </h3>
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
