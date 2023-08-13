import { usePopupClose } from "./usePopupClose";
import sucsess from "../images/sucsess.png";
import unsucsess from "../images/unsucsess.png";

function InfoToolTip({ isOpen, onClose, successful }) {
  usePopupClose(onClose, isOpen);
  return (
    <div
      className={`popup popup_type_infotooltip ${isOpen ? `popup_opened` : ""}`}
    >
      <div className="popup__container popup__container_type_infotooltip">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          src={successful ? sucsess : unsucsess}
          className="popup__status-img"
          alt={successful ? "Регистрация успешна" : "Отказ в регистрации"}
        />
        <h2 className="popup__title popup__title_type_infotooltip">
          {successful
            ? "Вы успешно зарегистрированы!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h2>
      </div>
    </div>
  );
}
export default InfoToolTip;
