import {
  StyledForm,
  StyledFormContainer,
  StyledFieldset,
  StyledInputContainer,
  StyledOutput,
  StyledButtonContainer,
} from "./ContactUsForm.styled";
import { StyledButton, StyledLinkAsButton } from "../Button/Button.styled";

export default function ContactUsForm({
  handleSubmit,
  onMessageChange,
  inicialAmountChar,
  amountCharLeft,
}) {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Contact us</h2>
      <StyledFormContainer>
        <StyledFieldset>
          <StyledInputContainer>
            <label htmlFor="name">*Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              minLength="2"
              maxLength="30"
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor="email">*Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="30"
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor="message">*Message:</label>
            <textarea
              onChange={onMessageChange}
              id="message"
              name="message"
              rows="9"
              cols="40"
              maxLength={inicialAmountChar}
              placeholder="Write your message here..."
              required
            />
            <StyledOutput>
              {amountCharLeft}
              {" characters left"}
            </StyledOutput>
          </StyledInputContainer>
        </StyledFieldset>
        <StyledButtonContainer>
          <StyledLinkAsButton href="/">← Home</StyledLinkAsButton>
          <StyledButton type="submit">Send</StyledButton>
        </StyledButtonContainer>
      </StyledFormContainer>
    </StyledForm>
  );
}
