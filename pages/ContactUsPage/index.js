import Header from "../../components/Header";
import ContactUsForm from "../../components/ContactUsForm";
import Link from "next/link";
import { useState } from "react";
import ToastNotification from "../../components/ToastNotification";

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
    setTimeout(exitToast, 3000);
  }

  function exitToast() {
    setToastAction("exit");
  }

  return (
    <>
      <Header />
      <p>
        <Link href="/">Home</Link>→Contact us
      </p>
      <ContactUsForm
        handleSubmit={handleSubmit}
        onMessageChange={handleMessageChange}
        inicialAmountChar={inicialAmountChar}
        amountCharLeft={amountCharLeft}
      />
      <ToastNotification toastAction={toastAction} />
    </>
  );
}
