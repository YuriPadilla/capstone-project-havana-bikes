import { StyledForm } from "./ContactUsForm.styled";
import { StyledButton } from "../Button/Button.styled";
//import { useRouter } from "next/router";
import Link from "next/link";

export default function ContactUsForm({ handleSubmit }) {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Contact us</h2>

      <label htmlFor="name">*Name:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="email">*Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="message">*Message:</label>
      <textarea
        id="message"
        name="message"
        rows="8"
        cols="40"
        placeholder="Write your message here..."
      />

      <div>
        <StyledButton type="submit">Send</StyledButton>
        <StyledButton type="button">
          <Link href="/">← Home</Link>
        </StyledButton>
      </div>
    </StyledForm>
  );
}
