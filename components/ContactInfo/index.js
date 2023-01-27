import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";

export default function ContactInfo() {
  const router = useRouter();

  return (
    <>
      <h2>Contact information</h2>
      <section>
        <div>
          <article>
            61 Consulado St. between Genios and Refugio St. Centro Habana, Cuba.
          </article>
          <article>Mobile: (+53) 5 306 2175</article>
          <article>Land line: (+53) 7 867 6782</article>
          <p>email: yuripadilla017@gmail.com</p>
        </div>
        <StyledButton
          type="button"
          onClick={() => router.push("/ContactUsPage")}
        >
          Contact us
        </StyledButton>
      </section>
    </>
  );
}
