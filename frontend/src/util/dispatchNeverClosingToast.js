import dispatchToast from "./dispatchToast";

function dispatchNeverClosingToast(element, type, id, extras) {
  return dispatchToast(element, type, {
    closeButton: false,
    position: "top-right",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    toastId: id,
    ...extras,
  });
}

export default dispatchNeverClosingToast;
