import { useForm } from "../hooks/useForm";
import React from 'react';

function Login({ onLogin}) {
  const { values, handleChange, errors, isValid, resetForm } = useForm({});
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values.email, values.password);
    resetForm();
  };

  return (
    <div className="popup popup_opened popup_type_auth">
      <div className="popup__container popup__container_theme_black">
        <h2 className="popup__title popup__title_type_auth">Вход</h2>

        <form
          onSubmit={handleSubmit}
          className={`form form_theme_black`}
          name="auth"
          noValidate
        >
          <input
            placeholder="Email"
            value={values.email || ""}
            className="form__input form__input_type_email form__input_theme_black"
            name="email"
            id="email-input"
            type="email"
            onChange={handleChange}
            minLength="2"
            maxLength="50"
            required
          />
          <span className="form__input-error email-input-error">{errors.email}</span>
          <input
            placeholder="Пароль"
            value={values.password || ""}
            className="form__input form__input_type_password form__input_theme_black"
            name="password"
            id="password-input"
            type="password"
            onChange={handleChange}
            minLength="8"
            required
          />
          <span className="form__input-error password-input-error">{errors.password}</span>
          <button
            className="form__save-button form__save-button_type_auth "
            type="submit"
            disabled={isValid?false:true}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
