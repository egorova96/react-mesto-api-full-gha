import React from 'react';
import { useEffect } from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      buttonTextValue="Сохранить"
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      onClose={onClose}
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
