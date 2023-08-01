import { Link } from "react-router-dom";
import { useValidForm } from "../hooks/useValid";

function Register(props) {
  const { isValid, values, handleChange } = useValidForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleRegistration(values.email, values.password);
  };

  return (
    <div className="popup popup_opened popup_type_auth">
      <div className="popup__container popup__container_theme_black">
        <h2 className="popup__title popup__title_type_auth">Регистрация</h2>

        <form
          onSubmit={handleSubmit}
          className={`form form_theme_black`}
          name="auth"
          noValidate
        >
          <input
            placeholder="Email"
            className="form__input form__input_type_email form__input_theme_black"
            value={values.email}
            name="email"
            id="email-input"
            type="email"
            onChange={handleChange}
            minLength="2"
            maxLength="50"
            required
          />

          <span className="form__input-error email-input-error"></span>

          <input
            placeholder="Пароль"
            className="form__input form__input_type_password form__input_theme_black"
            value={values.password}
            name="password"
            id="password-input"
            type="password"
            onChange={handleChange}
            minLength="8"
            required
          />

          <span className="form__input-error password-input-error"></span>

          <button
            type="submit"
            className="form__save-button form__save-button_type_auth"
            disabled={isValid ? false : true}
          >
            Зарегистрироваться
          </button>
          <p className="popup__text">
            Уже зарегистрированы?{" "}
            <Link className="popup__reg-link" to="/sign-in">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
