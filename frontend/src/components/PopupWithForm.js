import { usePopupClose } from "./usePopupClose";

function PopupWithForm(props) {
  usePopupClose(props.isOpen, props.onClose);
  return (
    <div className={`popup  ${props.isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name="popup__title popup__title_type_auth"
          className={`form form_type_${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className={`form__save-button form__save-button_type_${props.name} form__save-button_disabled disabled`}
          >
            {props.buttonTextValue || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
