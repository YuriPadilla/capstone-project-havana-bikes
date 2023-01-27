//import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import Link from "next/link";

export default function ContactInfo() {
  return (
    <>
      <h2>Contact information</h2>
      <section>
        <article>
          <p>
            61 Consulado St. between Genios and Refugio St. Centro Habana, Cuba.
            <br />
            Mobile: (+53) 5 391 2608
            <br />
            Land line: (+53) 7 867 6782
            <br />
            email: yuripadilla017@gmail.com
          </p>
        </article>
        <StyledButton type="button">
          <Link href="/ContactUsPage">Contact us</Link>
        </StyledButton>
      </section>
    </>
  );
}
