/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import profileImg from "../images/avatar.jpg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRout";
import InfoToolTip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    avatar: profileImg,
    name: "Жак-Ив-Кусто",
    about: "Исследователь океана",
  });
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");


  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
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
  };

  async function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    const newCard = await api.changeLikeCardStatus(card._id, isLiked)

    setCards(cards => {
      return cards.map(card => (card._id === newCard._id ? newCard : card))
    });
  };

  async function handleUpdateUser(data) {
    const response = await api.editProfile(data);

    setCurrentUser(response.user);
    closeAllPopups();
    };


  /*function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api
      .deleteCard(card._id, !isOwn)
      .then(() => {
        setCards((prevState) => prevState.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };*/

  async function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    const response = api.deleteCard(card._id, !isOwn)

    setCards((prevState) => prevState.filter((c) => c._id !== card._id));
  }

  /*function handleUpdateAvatar(avatarData) {
    api
      .editAvatar(avatarData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };*/
  async function handleUpdateAvatar(avatarData) {
    const response = await api.editAvatar(avatarData)
    console.log(response);
    setCurrentUser(response.user);
    closeAllPopups();
  }

  /*function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };*/
  // ?КАРТОЧКА СТАЛА ДОБАВЛЯТЬСЯ ТОЛЬКО ПОСЛЕ ОБНОВЛЕНИЯ?
  async function handleAddPlaceSubmit(card) {
    const response = await api.addCard(card)
    setCards([response, ...cards]);
    closeAllPopups();
  };
  // ДОБАВИЛА РЕВЕРС
  async function parseCards() {
    const response = await api.getCards()
    setCards(response.cards.reverse());
  };

  async function parseUser() {
    const user = await api.getUserInfo()
    setCurrentUser(user);
  };
  
  useEffect(() => {
    if(!loggedIn) return

    parseUser()
    parseCards()
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    loggedIn && navigate("/");
  }, [loggedIn, navigate]);

  async function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token == null) return

    const response = await api.getUserInfo()
    if (response == null) return

    setLoggedIn(true);
    setUserData(response.email);
    navigate("/", { replace: true });
  }

  async function handleLogin(email, password) {
    try {
      const response = await auth.authorize(email, password)
      if (response.token == null) return

      setLoggedIn(true);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);

      setInfoTooltip(false);
      setInfoTooltipPopupOpen(true);
    }
  };

  function logOut() {
    localStorage.removeItem("token");
    setUserData("");
    setLoggedIn(false);
    navigate("/sign-in");
  };


  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        navigate("/sign-in", { replace: true });
        setInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-background">
        <div className="page page-background">
          <Header email={userData} onLogout={logOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  onCardClick={handleCardClick}
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
              element={<Register onRegister={handleRegistration} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin} />}
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
            onAddPlace={handleAddPlaceSubmit}
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
            successful={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
