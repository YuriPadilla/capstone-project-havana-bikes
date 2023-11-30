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
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    setInputDateValues({ from: "", until: "" });
    event.target.elements.from.value = "";
    event.target.elements.until.value = "";
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
      />
      <ToastNotification
        toastAction={toastAction}
        toastMessage="Booking successful"
      />
    </>
  );
}
