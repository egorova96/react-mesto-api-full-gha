const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: ".form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const formProfile = document.querySelector(".form_type_profile");
const formPlace = document.querySelector(".form_type_place");
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const avatarEditBtn = document.querySelector('.profile__avatar-edit');
const formAvatar = document.querySelector('.form_type_avatar');
const deleteButton = document.querySelectorAll('.elements__delete-button');
const imageSubmitButton = document.querySelector('.form__save-button_type_place');
const profileSubmitButton  = document.querySelector('.form__save-button_type_profile');

export {initialCards};
export {validationConfig};
export {formProfile};
export {formPlace};
export {addButton};
export {editButton};
export {nameInput};
export {descriptionInput};
export {avatarEditBtn};
export {formAvatar};
export {deleteButton};
export {imageSubmitButton};
export {profileSubmitButton};

