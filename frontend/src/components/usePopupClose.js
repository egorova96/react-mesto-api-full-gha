import { useEffect } from "react";

export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlayClick = (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup();
      }
    };
    const handleEscapeClick = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    document.addEventListener("keydown", handleEscapeClick);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, closePopup]);
}
