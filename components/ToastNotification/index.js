export default function ToastNotification({ toastAction }) {
  return (
    <button className={`toast ${toastAction}`}>Your message was sent</button>
  );
}
