import { useState } from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRout";
import InfoToolTip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const nav = useNavigate();

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevState) => prevState.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarData) {
    api
      .editAvatar(avatarData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (loggedIn) {
      auth.getContent(localStorage.getItem("token")).then((result) => {
        api
          .setUserInfo()
          .then((result) => {
            setCurrentUser(result);
          })
          .catch((err) => {
            console.log(err);
          });
        api
          .getInitialCards()
          .then((result) => {
            setCards(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      nav("/", { replace: true });
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            const email = res.data.email;
            setUserData(email);
            setLoggedIn(true);
            nav("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((result) => {
        if (result) {
          setUserData(email);
          setLoggedIn(true);
          nav("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function logOut() {
    localStorage.removeItem("token");
    setUserData("");
    setLoggedIn(false);
    nav("/sign-in", { replace: true });
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then(() => {
        nav("/sign-in", { replace: true });
        setInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-background">
        <div className="page page-background">
          <Header email={userData} logOut={logOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  handleCardClick={handleCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  loggedIn={loggedIn}
                  element={Main}
                  cards={cards}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegistration={handleRegistration} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>
          {loggedIn ? <Footer /> : ""}
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            onUpdatePlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            buttonTextValue="Да"
            title="Вы уверены?"
            name="delete"
            onClose={closeAllPopups}
          ></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoToolTip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
