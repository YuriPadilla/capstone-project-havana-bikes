import {
  StyledForm,
  StyledInputContainer,
  StyledOutput,
  StyledButtonContainer,
} from "./ContactUsForm.styled";
import { StyledButton } from "../Button/Button.styled";
import styled from "styled-components";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 20px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const StyledWrapperHeading = styled.div`
  width: 100%;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

export default function ContactUsForm({
  handleSubmit,
  onMessageChange,
  inicialAmountChar,
  amountCharLeft,
}) {
  return (
    <>
      <StyledSection>
        <StyledWrapperHeading>
          <StyledHeadingH3>Contact us</StyledHeadingH3>
          <hr />
        </StyledWrapperHeading>
        <StyledForm onSubmit={handleSubmit}>
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
          <StyledButtonContainer>
            <StyledButton type="submit" disabled={false}>
              Send
            </StyledButton>
          </StyledButtonContainer>
        </StyledForm>
      </StyledSection>
    </>
  );
}
