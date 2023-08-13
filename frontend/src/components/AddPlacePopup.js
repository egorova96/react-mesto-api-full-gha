import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleTitleChange(evt) {
    setName(evt.target.value);
  }
  function handleImgChange(evt) {
    setLink(evt.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();

    console.log(123)

    onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      buttonTextValue="Создать"
      isOpen={isOpen}
      title="Новое место"
      name="place"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        name="name"
        className="form__input form__input_type_place"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleTitleChange}
      />
      <span className="form__input-error place-input-error"></span>
      <input
        id="url-input"
        name="description"
        className="form__input form__input_type_place-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleImgChange}
      />
      <span className="form__input-error place-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
