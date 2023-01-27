import Header from "../../components/Header";
import ContactUsForm from "../../components/ContactUsForm";
import Link from "next/link";
import { useState } from "react";
import ToastNotification from "../../components/ToastNotification";

export default function ContactUsPage() {
  const [toastAction, setToastAction] = useState("");
  function exitToast() {
    setToastAction("exit");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    setToastAction("enter");
    setTimeout(exitToast, 3000);
  }

  return (
    <>
      <Header />
      <p>
        <Link href="/">Home</Link>→<Link href="">Contact us</Link>
      </p>
      <ContactUsForm handleSubmit={handleSubmit} />
      <ToastNotification toastAction={toastAction} />
    </>
  );
}
