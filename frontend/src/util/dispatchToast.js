import { toast } from "react-toastify";

function dispatchToast(message, type, extras) {
  toast(message, {
    type: type || "info",
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    ...extras,
  });
}

export default dispatchToast;
