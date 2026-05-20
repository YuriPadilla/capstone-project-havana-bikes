import SelectedProducts from "../../components/SelectedProducts";
import useLocalStorageState from "use-local-storage-state";
import LeaseTimeForm from "../../components/LeaseTimeForm";
import { useAtom, useSetAtom } from "jotai";
import { bookingConfirmationAtom, inputDateAtom } from "@/store/atoms";
import { calculateRentalPrice } from "@/utils/calculateRentalPrice";
import { useState } from "react";
import ToastNotification from "../../components/ToastNotification";
import { useRouter } from "next/router";

export default function ShoppingCartPage() {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts, { removeItem }] =
    useLocalStorageState("selectedProducts", { defaultValue: [] });

  const [inputDateValues, setInputDateValues] = useAtom(inputDateAtom);
  const setBookingConfirmation = useSetAtom(bookingConfirmationAtom);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
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

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setBookingError("");

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const initialDate = new Date(data.from).getTime();
    const finalDate = new Date(data.until).getTime();
    const amountDays =
      Math.round((finalDate - initialDate) / (24 * 60 * 60 * 1000)) + 1;
    const bookingPayload = {
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      selectedBikes: selectedProducts.map((product) => product._id),
      fromDate: data.from,
      untilDate: data.until,
      totalPrice: calculateRentalPrice(selectedProducts.length, amountDays),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        setBookingError("Booking could not be created");
        return;
      }

      const savedBooking = await response.json();
      const confirmationData = {
        selectedProducts,
        fromDate: bookingPayload.fromDate,
        untilDate: bookingPayload.untilDate,
        totalPrice: bookingPayload.totalPrice,
        customerName: bookingPayload.customerName,
        customerEmail: bookingPayload.customerEmail,
        customerPhone: bookingPayload.customerPhone,
        booking: savedBooking,
      };

      setBookingConfirmation(confirmationData);
      setInputDateValues({ from: "", until: "" });
      setCustomerInfo({ name: "", email: "", phone: "" });
      form.reset();
      removeItem();
      router.push("/BookingConfirmationPage");

      setToastAction("enter");
      setTimeout(() => setToastAction("exit"), 3000);
    } catch (error) {
      setBookingError("Booking could not be created");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SelectedProducts
        products={selectedProducts}
        handleEmptyShoppingCart={handleEmptyShoppingCart}
        onRemoveFromShopCart={handleRemoveFromShopCart}
      />
      {bookingError && <p>{bookingError}</p>}
      <LeaseTimeForm
        handleChange={handleChange}
        onSubmit={handleSubmit}
        howManyBikes={selectedProducts.length}
        fromDate={inputDateValues.from}
        untilDate={inputDateValues.until}
        customerInfo={customerInfo}
        isSubmitting={isSubmitting}
      />
      <ToastNotification
        toastAction={toastAction}
        toastMessage="Booking successful"
      />
    </>
  );
}
