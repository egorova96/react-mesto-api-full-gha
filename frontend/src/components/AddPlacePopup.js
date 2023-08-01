import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleTitleChange(evt) {
    setName(evt.target.value);
  }
  function handleImgChange(evt) {
    setLink(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdatePlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      buttonTextValue="Создать"
      isOpen={props.isOpen}
      title="Новое место"
      name="place"
      onClose={props.onClose}
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
