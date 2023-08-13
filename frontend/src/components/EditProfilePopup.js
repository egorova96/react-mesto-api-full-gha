import React from 'react';
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonTextValue="Сохранить"
      isOpen={isOpen}
      title="Редактировать профиль"
      name="profile"
      onClose={onClose}
    >
      <input
        id="name-input"
        name="name"
        className="form__input form__input_type_name"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="form__input-error name-input-error"></span>
      <input
        id="description-input"
        name="description"
        className="form__input form__input_type_description"
        type="text"
        placeholder="Описание"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="form__input-error description-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
