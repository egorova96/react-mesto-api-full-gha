import React from 'react';
import Card from "./Сard";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
console.log(currentUser.avatar);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__edit">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            card={card}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
