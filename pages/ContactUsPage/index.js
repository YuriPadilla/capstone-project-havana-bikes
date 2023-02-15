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
  const [amountCharLeft, setAmountCharLeft] = useState(inicialAmountChar);

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
        onMessageChange={handleMessageChange}
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
