import { StyledToast } from "./ToastNotification.styled";

export default function ToastNotification({ toastAction, toastMessage }) {
  return <StyledToast action={toastAction}>{toastMessage}</StyledToast>;
}
