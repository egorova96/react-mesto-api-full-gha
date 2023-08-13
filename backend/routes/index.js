const router = require('express').Router();

const userRouters = require('./users');

const cardRouters = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

router.use(userRouters);
router.use(cardRouters);
router.use('*', (req, res, next) => {
  next(new NotFoundError('К сожалению, запрашиваемая страница не найдена'));
});

module.exports = router;
