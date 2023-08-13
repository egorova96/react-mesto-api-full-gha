import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <div className="header__navigation">
        <p className="header__email">{props.email}</p>
        <Routes>
          <Route
            path="/"
            element={
              <Link
                className="header__nav-link header__nav-link_type_exit"
                onClick={props.onLogout}
                to="/sign-in"
              >
                Выйти
              </Link>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <Link className="header__nav-link" to="/sign-up">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Link className="header__nav-link" to="/sign-in">
                Войти
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
}

export default Header;
