const Card = require('../models/card');

const ERROR_NOT_FOUND = 404;
const ERROR_FETCH = 500;
const ERROR_INVALID_DATA = 400;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards.reverse() }))
    .catch(() => res.status(ERROR_FETCH).send({ message: 'Error' }));
};

module.exports.deleteCardsById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error('No se encuentran cartas con este ID');
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_FETCH).send({ message: 'Error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })

    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INVALID_DATA).send({ message: 'Datos invalidos' });
      } else {
        res.status(ERROR_FETCH).send({ message: 'Error' });
      }
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(ERROR_FETCH).send({ message: 'Error' }));

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(ERROR_FETCH).send({ message: 'Error' }));