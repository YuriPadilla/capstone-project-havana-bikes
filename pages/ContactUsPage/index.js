import ContactUsForm from "../../components/ContactUsForm";
import { useState } from "react";
import ToastNotification from "../../components/ToastNotification";

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
