import {
  StyledForm,
  StyledInputContainer,
  StyledOutput,
  StyledButtonContainer,
} from "./ContactUsForm.styled";
import { StyledButton } from "../Button/Button.styled";
import StandardSectionApp from "../StandardSectionApp";

export default function ContactUsForm({
  handleSubmit,
  onNameChange,
  onEmailChange,
  onMessageChange,
  inputName,
  inputEmail,
  inicialAmountChar,
  amountCharLeft,
}) {
  return (
    <>
      <StandardSectionApp sectionTitle="Contact us">
        <StyledForm onSubmit={handleSubmit}>
          <StyledInputContainer>
            <label htmlFor="name">*Name:</label>
            <input
              onChange={onNameChange}
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
              onChange={onEmailChange}
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
          <StyledButtonContainer>
            <StyledButton type="submit" disabled={inputName === "" || inputEmail === "" || amountCharLeft === 250 ? true : false}>
              Send
            </StyledButton>
          </StyledButtonContainer>
        </StyledForm>
      </StandardSectionApp>
    </>
  );
}
