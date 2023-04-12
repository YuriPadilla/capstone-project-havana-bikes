import {
  StyledForm,
  StyledInputContainer,
  StyledOutput,
  StyledButtonContainer,
} from "./ContactUsForm.styled";
import { StyledButton } from "../Button/Button.styled";
import styled from "styled-components";
//import Link from "next/link";

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

// const StyledButton = styled.button`
//   text-decoration: none;
//   border: 1px solid rgb(205, 211, 205);
//   border-radius: 8px;
//   color: black;
//   font-size: inherit;
//   font-family: inherit;
//   padding: 3px 7px;
//   background: rgb(222, 245, 234);
//   box-shadow: 3px 3px 8px rgb(95, 117, 129);
// `;

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
