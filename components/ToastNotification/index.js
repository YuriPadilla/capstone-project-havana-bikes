import { StyledToast } from "./ToastNotification.styled";

export default function ToastNotification({ toastAction }) {
  return <StyledToast action={toastAction}>Your message was sent</StyledToast>;
}
