import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  const changeLikeColor = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  return (
    <div className="elements__item">
      <img
        className="elements__pic"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="elements__description">
        <p className="elements__name">{props.card.name}</p>
        <div className="elements__like">
          <button
            type="button"
            onClick={handleLikeClick}
            className={changeLikeColor}
          ></button>
          <span className="elements__likes-counter">
            {props.card.likes.length}
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
