import { usePopupClose } from "./usePopupClose";

function PopupWithForm({name, title, isOpen, buttonTextValue, onClose, onSubmit, children}) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup  ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          name="popup__title popup__title_type_auth"
          className={`form form_type_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`form__save-button form__save-button_type_${name} form__save-button_disabled disabled`}
          >
            {buttonTextValue || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
