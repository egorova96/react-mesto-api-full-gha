import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const likeColorClassName = (`elements__like-button ${
    isLiked && "elements__like-button_active"
  }`);

  return (
    <div className="elements__item">
      <img
        className="elements__pic"
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={handleCardClick}
      />
      <div className="elements__description">
        <p className="elements__name">{`${card.name}`}</p>
        <div className="elements__like">
          <button
            type="button"
            onClick={handleLikeClick}
            className={likeColorClassName}
          ></button>
          <span className="elements__likes-counter">
            {`${card.likes.length}`}
          </span>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="elements__delete-button"
          onClick={handleDeleteClick}
        />
      )}
    </div>
  );
}

export default Card;
