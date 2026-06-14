import ContactUsForm from "../../components/ContactUsForm";
import { useState } from "react";
import ToastNotification from "../../components/ToastNotification";

const inicialAmountChar = 250;

export default function ContactUsPage() {
  const [toastAction, setToastAction] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [amountCharLeft, setAmountCharLeft] = useState(inicialAmountChar);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNameChange(event) {
    setInputName(event.target.value);
  }

  function handleEmailChange(event) {
    setInputEmail(event.target.value);
  }

  function handleMessageChange(event) {
    const maxLengthMessage = event.target.maxLength;
    const currentLengthMessage = event.target.value.length;
    setInputMessage(event.target.value);
    setAmountCharLeft(maxLengthMessage - currentLengthMessage);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: data.name,
          customerEmail: data.email,
          message: data.message,
        }),
      });

      if (!response.ok) {
        setToastMessage("Your message could not be sent. Please try again.");
        setToastAction("enter");
        setTimeout(() => setToastAction("exit"), 3000);
        return;
      }

      event.target.reset();
      setInputName("");
      setInputEmail("");
      setInputMessage("");
      setAmountCharLeft(inicialAmountChar);
      event.target.elements.name.focus();

      setToastMessage(
        "Your message was received. We will reply as soon as possible."
      );
      setToastAction("enter");
      setTimeout(() => setToastAction("exit"), 3000);
    } catch (error) {
      setToastMessage("Your message could not be sent. Please try again.");
      setToastAction("enter");
      setTimeout(() => setToastAction("exit"), 3000);
    } finally {
      setIsSubmitting(false);
    }
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
        inputMessage={inputMessage}
        inicialAmountChar={inicialAmountChar}
        amountCharLeft={amountCharLeft}
        isSubmitting={isSubmitting}
      />
      <ToastNotification
        toastAction={toastAction}
        toastMessage={toastMessage}
      />
    </>
  );
}
