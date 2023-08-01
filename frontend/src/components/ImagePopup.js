import { usePopupClose } from "./usePopupClose";

function ImagePopup({ onClose, card }) {
  usePopupClose(card, onClose);
  return (
    <div
      className={`popup popup_type_image ${
        Object.keys(card).length != 0 ? `popup_opened` : ``
      }`}
    >
      <div className="popup__background">
        <button
          type="button"
          className="popup__close-button  popup__close-button_type_image"
          onClick={onClose}
        ></button>
        <img className="popup__card" src={card.link} alt="Картинка" />
        <p className="popup__text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
