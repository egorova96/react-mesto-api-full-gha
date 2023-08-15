/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Card = require('../models/card');
const { OK } = require('../utils/constants');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

// const getAnswer = (res, data) => res.status(200).send(data);

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards })).catch(next);
};

module.exports.createCard = (req, res, next) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then((card) => res.status(OK).send(card))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Введены неверные данные'));
      } else {
      next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Выбранного фото не существует');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав доступа');
      }
      Card.findByIdAndRemove(cardId).then((cardData) => {
      if (!card) {
        throw new ValidationError('Выбранного фото не существует');
      }
      res.status(OK).send(cardData);
    })
    .catch(next);
})
.catch((err) => {
  if (err.name === 'CastError') {
    return next(new ValidationError('Неверный Id пользователя'));
  }
  return next(err);
});
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    ).orFail(() => new NotFoundError('Такой карточки не существует'))
    .then((newcard) => res.status(OK).send(newcard))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card
  .findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Выбранного фото не существует');
    }
    res.status(OK).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new ValidationError('Неверный Id пользователя'));
    }
    return next(err);
  });
};
