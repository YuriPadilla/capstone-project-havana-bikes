import SelectedProducts from "../../components/SelectedProducts";
import useLocalStorageState from "use-local-storage-state";
import LeaseTimeForm from "../../components/LeaseTimeForm";
import { useAtom } from "jotai";
import { inputDateAtom } from "@/store/atoms";
import { useState } from "react";
import ToastNotification from "../../components/ToastNotification";
import { useRouter } from "next/router";

export default function ShoppingCartPage() {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts, { removeItem }] =
    useLocalStorageState("selectedProducts", { defaultValue: [] });

  const [inputDateValues, setInputDateValues] = useAtom(inputDateAtom);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [toastAction, setToastAction] = useState("");

  function handleEmptyShoppingCart() {
    removeItem();
    router.push("/Bikes");
  }

  function handleRemoveFromShopCart(id) {
    setSelectedProducts((previousState) => {
      return previousState.filter((product) => product._id !== id);
    });
  }

  function handleChange(event) {
    if (event.target.name === "from") {
      setInputDateValues({ ...inputDateValues, from: event.target.value });
    } else if (event.target.name === "until") {
      setInputDateValues({ ...inputDateValues, until: event.target.value });
    } else if (
      event.target.name === "name" ||
      event.target.name === "email" ||
      event.target.name === "phone"
    ) {
      setCustomerInfo({
        ...customerInfo,
        [event.target.name]: event.target.value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    setInputDateValues({ from: "", until: "" });
    setCustomerInfo({ name: "", email: "", phone: "" });
    removeItem();

    setToastAction("enter");
    setTimeout(() => setToastAction("exit"), 3000);
  }

  return (
    <>
      <SelectedProducts
        products={selectedProducts}
        handleEmptyShoppingCart={handleEmptyShoppingCart}
        onRemoveFromShopCart={handleRemoveFromShopCart}
      />
      <LeaseTimeForm
        handleChange={handleChange}
        onSubmit={handleSubmit}
        howManyBikes={selectedProducts.length}
        fromDate={inputDateValues.from}
        untilDate={inputDateValues.until}
        customerInfo={customerInfo}
      />
      <ToastNotification
        toastAction={toastAction}
        toastMessage="Booking successful"
      />
    </>
  );
}
