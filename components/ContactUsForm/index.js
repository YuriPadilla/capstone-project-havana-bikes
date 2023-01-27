import { StyledForm } from "./ContactUsForm.styled";
import { StyledButton } from "../Button/Button.styled";
import { useRouter } from "next/router";

export default function ContactUsForm({ handleSubmit }) {
  const router = useRouter();

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Contact us</h2>
        <label htmlFor="name">
          *Name:
          <br />
          <input type="text" id="name" name="name" required />
        </label>
        <label htmlFor="email">
          *Email:
          <br />
          <input type="email" id="email" name="email" required />
        </label>
        <label htmlFor="message">
          *Message:
          <br />
          <textarea
            id="message"
            name="message"
            rows="8"
            cols="40"
            placeholder="Write your message here..."
          />
        </label>
        <div>
          <StyledButton type="submit">Send</StyledButton>
          <StyledButton type="button" onClick={() => router.push("/")}>
            ← Home
          </StyledButton>
        </div>
      </StyledForm>
    </>
  );
}
