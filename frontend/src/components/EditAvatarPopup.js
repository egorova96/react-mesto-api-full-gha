import { useState } from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      buttonTextValue="Сохранить"
      isOpen={props.isOpen}
      title="Обновить аватар"
      name="avatar"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="avatar-input"
        name="avatar"
        className="form__input form__input_type_avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
        minLength="2"
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
