import ContactUsForm from "../../components/ContactUsForm";
import Link from "next/link";
import { useState } from "react";
import ToastNotification from "../../components/ToastNotification";
import styled from "styled-components";

const StyledP = styled.p`
  margin: 0;
  padding: 0;
`;

const inicialAmountChar = 250;

export default function ContactUsPage() {
  const [toastAction, setToastAction] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [amountCharLeft, setAmountCharLeft] = useState(inicialAmountChar);

  function handleNameChange(event) {
    setInputName(event.target.value);
  }

  function handleEmailChange(event) {
    setInputEmail(event.target.value);
  }

  function handleMessageChange(event) {
    const maxLengthMessage = event.target.maxLength;
    const currentLengthMessage = event.target.value.length;
    setAmountCharLeft(maxLengthMessage - currentLengthMessage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    event.target.reset();
    setAmountCharLeft(inicialAmountChar);
    event.target.elements.name.focus();

    setToastAction("enter");
    setTimeout(() => setToastAction("exit"), 3000);
  }

  return (
    <>
      <StyledP>
        <Link href="/">Home</Link>→Contact us
      </StyledP>
      <ContactUsForm
        handleSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onEmailChange={handleEmailChange}
        onMessageChange={handleMessageChange}
        inputName={inputName}
        inputEmail={inputEmail}
        inicialAmountChar={inicialAmountChar}
        amountCharLeft={amountCharLeft}
      />
      <ToastNotification
        toastAction={toastAction}
        toastMessage="Your message was sent"
      />
    </>
  );
}
